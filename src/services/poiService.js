import axios from 'axios';

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

// OpenTripMap implementation
export class OTMProvider extends IPoiProvider {
    async getPOIs({
        lat = defaultConfig.defaultLat,
        lng = defaultConfig.defaultLng,
        radius = defaultConfig.radius,
        kinds = defaultConfig.defaultCategory
    }) {
        try {
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
