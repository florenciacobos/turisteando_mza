import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { useGeolocation } from '../hooks/useGeolocation';

const OpenLayersMapView = ({ pois, location, isTracking }) => {
  console.log('[DEBUG] Renderizando OpenLayersMapView');
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  // Referencia a las features de ubicación
  const locationFeature = useRef(new Feature());
  const accuracyFeature = useRef(new Feature());

  // Inicializar el mapa
  useEffect(() => {
    if (!mapRef.current) return;

    // Crear capas de ubicación del usuario
    const locationSource = new VectorSource({
      features: [locationFeature.current, accuracyFeature.current]
    });
    const locationLayer = new VectorLayer({
      source: locationSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: '#3399CC' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      })
    });

    // Crear capa de POIs
    const features = pois.map((poi) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([poi.lng, poi.lat])),
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.05,
          }),
        })
      );
      return feature;
    });

    const poiLayer = new VectorLayer({
      source: new VectorSource({ features }),
    });

    // Crear mapa
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        locationLayer,
        poiLayer,
      ],
      view: new View({
        center: fromLonLat([-68.8458, -32.8895]),
        zoom: 12,
      }),
    });

    setMap(mapInstance);

    return () => mapInstance.setTarget(null);
  }, [pois]);

  // Actualizar ubicación en el mapa
  useEffect(() => {
    if (!map || !location) return;

    const coords = fromLonLat([location.lng, location.lat]);

    // Actualizar punto de ubicación
    locationFeature.current.setGeometry(new Point(coords));

    // Actualizar círculo de precisión
    const accuracyGeom = new Point(coords);
    accuracyFeature.current.setGeometry(accuracyGeom);
    accuracyFeature.current.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 20, // Podríamos usar location.accuracy pero necesitaría conversión
          fill: new Fill({ color: 'rgba(51, 153, 204, 0.2)' }),
          stroke: new Stroke({ color: '#3399CC', width: 2 })
        })
      })
    );

    // Centrar mapa en la ubicación si está siguiendo
    if (isTracking) {
      map.getView().animate({
        center: coords,
        duration: 500
      });
    }
  }, [location, map, isTracking]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default OpenLayersMapView;