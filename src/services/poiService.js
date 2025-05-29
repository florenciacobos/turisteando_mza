import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

// OpenTripMap client configuration
const otmClient = axios.create({
    baseURL: import.meta.env.VITE_OPENTRIPMAP_BASE_URL || '/opentripmap',
    params: {
        apikey: import.meta.env.VITE_OPENTRIPMAP_API_KEY
    }
});



// Default configuration from environment
const defaultConfig = {
    language: import.meta.env.VITE_OPENTRIPMAP_LANG || 'es',
    radius: Number(import.meta.env.VITE_OPENTRIPMAP_RADIUS) || 10000,
    limit: Number(import.meta.env.VITE_OPENTRIPMAP_LIMIT) || 50,
    defaultLat: Number(import.meta.env.VITE_MAP_DEFAULT_LAT),
    defaultLng: Number(import.meta.env.VITE_MAP_DEFAULT_LON),
    defaultCategory: import.meta.env.VITE_MAP_DEFAULT_CATEGORY || 'cultural'
};

// Icon mapping for different categories
export const ICON_MAP = {
    'historic': 'monument.svg',
    'architecture': 'building.svg',
    'cultural': 'museum.svg',
    'natural': 'tree.svg',
    'religion': 'church.svg',
    'industrial': 'factory.svg',
    'sport': 'sports.svg',
    'amusements': 'entertainment.svg',
    'accomodations': 'hotel.svg',
    'tourist_facilities': 'info.svg',
    'default': 'marker.svg'
};

// Provider interface
export class IPoiProvider {
    // eslint-disable-next-line no-unused-vars
    async getPOIs(options) {
        throw new Error('Not implemented');
    }
}

// Normaliza un POI de OpenTripMap al formato de nuestra base de datos
function normalizeOtmPoi(otmFeature) {
    const { properties, geometry } = otmFeature;
    return {
        source: 'opentripmap',
        external_id: properties.xid,
        name: properties.name || 'Sin nombre',
        description: properties.wikipedia_extract || properties.kinds || '',
        // PostGIS en Supabase espera un objeto con type y coordinates
        geo: { 
            type: 'Point',
            coordinates: [geometry.coordinates[0], geometry.coordinates[1]]
        },
        kinds: properties.kinds ? properties.kinds.split(',') : [],
        created_by: null, // null para POIs de OpenTripMap
        ts: new Date().toISOString()
    };
}

// Guarda o actualiza un POI en Supabase
async function savePoi(poiData) {
    const { data, error } = await supabase
        .from('point_of_interest')
        .upsert(poiData, {
            onConflict: 'source,external_id',
            ignoreDuplicates: false // false para actualizar si ya existe
        })
        .select();

    if (error) {
        console.error('Error saving POI:', error);
        throw error;
    }

    return data;
}

// Verifica si un POI existe y no está expirado en la cache
export async function getPoiFromCache(externalId, maxAge = 7 * 24 * 60 * 60 * 1000) { // 7 días por defecto
    const { data, error } = await supabase
        .from('point_of_interest')
        .select('*')
        .eq('source', 'opentripmap')
        .eq('external_id', externalId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // código para "no rows returned"
            return null;
        }
        throw error;
    }

    // Verificar si el POI está expirado
    const poiDate = new Date(data.ts);
    const now = new Date();
    if (now - poiDate > maxAge) {
        return null; // POI expirado, necesita actualización
    }

    return data;
}

/**
 * Busca POIs en un radio específico alrededor de un punto
 * @param {number} lat Latitud del centro
 * @param {number} lng Longitud del centro
 * @param {number} radiusInMeters Radio de búsqueda en metros
 * @returns {Promise<Array>} Array de POIs dentro del radio
 */
export async function findPoisInRadius(lat, lng, radiusInMeters = defaultConfig.radius) {
    const { data, error } = await supabase
        .rpc('get_pois_within', { 
            _lat: lat, 
            _lon: lng, 
            _rad: radiusInMeters 
        });

    if (error) throw error;
    return data;
}

/**
 * Busca POIs por categoría
 * @param {string} category Categoría a buscar
 * @returns {Promise<Array>} Array de POIs que contienen la categoría
 */
export async function findPoisByCategory(category) {
    const { data, error } = await supabase
        .from('point_of_interest')
        .select('*')
        .contains('kinds', [category]);

    if (error) throw error;
    return data;
}

/**
 * Busca POIs por texto en nombre o descripción
 * @param {string} searchText Texto a buscar
 * @returns {Promise<Array>} Array de POIs que coinciden con la búsqueda
 */
export async function searchPoisByText(searchText) {
    const { data, error } = await supabase
        .from('point_of_interest')
        .select('*')
        .or(`name.ilike.%${searchText}%,description.ilike.%${searchText}%`);

    if (error) throw error;
    return data;
}

// OpenTripMap implementation
export class OTMProvider extends IPoiProvider {
    async getPOIs({
        lat = defaultConfig.defaultLat,
        lng = defaultConfig.defaultLng,
        radius = defaultConfig.radius,
        kinds = defaultConfig.defaultCategory
    }) {
        try {
            // Primero intentamos obtener POIs de la cache
            const cachedPois = await findPoisInRadius(lat, lng, radius);
            if (cachedPois.length > 0) {
                console.log('Using cached POIs');
                return cachedPois.map(poi => {
                    // La geometría viene como un objeto con coordinates [lng, lat]
                    const coordinates = poi.geo?.coordinates || [0, 0];
                    return {
                        id: poi.external_id,
                        name: poi.name,
                        description: poi.description,
                        lat: coordinates[1], // PostGIS devuelve [lng, lat]
                        lng: coordinates[0],
                        category: (poi.kinds?.[0] || '').split(',')[0],
                        icon: ICON_MAP[(poi.kinds?.[0] || '').split(',')[0]] || ICON_MAP.default
                    };
                });
            }

            // Si no hay en cache, consultamos OpenTripMap
            const searchParams = {
                lat,
                lon: lng,
                radius,
                limit: defaultConfig.limit,
                kinds,
                lang: defaultConfig.language,
                format: 'geojson'
            };
            
            console.log('Fetching POIs from OpenTripMap with params:', searchParams);
            const response = await otmClient.get('/places/radius', {
                params: searchParams
            });

            if (!response.data || !response.data.features) {
                console.warn('Invalid response format from OpenTripMap');
                throw new Error('Invalid response format');
            }

            // Normalizar y guardar cada POI
            const normalizedPois = response.data.features.map(normalizeOtmPoi);
            await Promise.all(normalizedPois.map(poi => savePoi(poi)));

            // Mantener el formato de retorno existente para compatibilidad
            return response.data.features.map(feature => ({
                id: feature.id || feature.properties.xid,
                name: feature.properties.name || 'Sin nombre',
                description: feature.properties.kinds || '',
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
                category: (feature.properties.kinds || '').split(',')[0],
                icon: ICON_MAP[(feature.properties.kinds || '').split(',')[0]] || ICON_MAP.default
            }));
        } catch (error) {
            console.error('Error fetching POIs from OpenTripMap:', error);
            throw error;
        }
    }
}

// Google Places implementation stub
export class GoogleProvider extends IPoiProvider {
    // eslint-disable-next-line no-unused-vars
    async getPOIs(options) {
        throw new Error('Google Places provider not implemented yet');
    }
}

// GeoNames implementation stub
export class GeoNamesProvider extends IPoiProvider {
    // eslint-disable-next-line no-unused-vars
    async getPOIs(options) {
        throw new Error('GeoNames provider not implemented yet');
    }
}

// Factory function to get provider instance
export function getProvider(key = import.meta.env.VITE_POI_PROVIDER) {
    switch (key) {
        case 'otm':
            return new OTMProvider();
        case 'google':
            return new GoogleProvider();
        case 'geonames':
            return new GeoNamesProvider();
        default:
            return new OTMProvider(); // Default to OpenTripMap
    }
}

// Main function to fetch POIs with error handling and fallback
export async function fetchPOIs(options = {}) {
    const provider = getProvider();
    try {
        return await provider.getPOIs(options);
    } catch (error) {
        console.warn('Failed to fetch POIs from provider, using mock data:', error);
        // Import and return mock data as fallback
        const { default: mockPOIs } = await import('../data/mockPOIs.js');
        return mockPOIs;
    }
}
