import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
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
import Select from 'ol/interaction/Select';

const OpenLayersMapView = ({ pois, location, isTracking }) => {
  console.log('[DEBUG] Renderizando OpenLayersMapView');
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    const poisFeatures = pois.map((poi) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([poi.lng, poi.lat])),
        poi: poi // Store POI data in feature for click handling
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
      source: new VectorSource({ features: poisFeatures }),
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

    // Manejar clics en el mapa
    const selectClick = new Select({
      condition: (event) => event.type === 'singleclick',
      layers: [poiLayer], // Solo queremos seleccionar en la capa de POIs
    });

    selectClick.on('select', (e) => {
      if (e.selected.length > 0) {
        const feature = e.selected[0];
        const poi = feature.get('poi');
        console.log('POI seleccionado:', poi);
        setSelectedPoi(poi);
        setIsModalOpen(true);
      }
    });

    mapInstance.addInteraction(selectClick);

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
      mapInstance.removeInteraction(selectClick);
    };
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

  const handleClose = () => setIsModalOpen(false);
  const handleNavigate = () => {
    if (selectedPoi) {
      if (selectedPoi.id === 'N5155445739' || selectedPoi.id === 'N5155445740') {
        navigate('/lugar');
      } else {
        navigate(`/place/${selectedPoi.id}`);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{
          selectedPoi?.id === 'N5155445739' || selectedPoi?.id === 'N5155445740'
            ? 'Parque General San Martín'
            : selectedPoi?.name
        }</DialogTitle>
        <DialogContent>
          <p>{
            selectedPoi?.id === 'N5155445739' || selectedPoi?.id === 'N5155445740'
              ? 'El parque más emblemático de Mendoza, ideal para caminatas y actividades al aire libre.'
              : (selectedPoi?.description || 'Sin descripción disponible')
          }</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNavigate} variant="contained" color="primary">
            Ver más
          </Button>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OpenLayersMapView;