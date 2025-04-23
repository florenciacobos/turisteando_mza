import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';

const OpenLayersMapView = ({ pois }) => {
  console.log('[DEBUG] Renderizando OpenLayersMapView');
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const features = pois.map((poi) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([poi.lng, poi.lat])),
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Icono genérico
            scale: 0.05,
          }),
        })
      );
      return feature;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([-68.8458, -32.8895]), // Centro en Mendoza
        zoom: 12,
      }),
    });

    return () => map.setTarget(null); // Cleanup al desmontar
  }, [pois]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default OpenLayersMapView;