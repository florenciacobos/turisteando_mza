import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMapView = ({ pois }) => {
  console.log('[DEBUG] Renderizando LeafletMapView');
  return (
    <MapContainer
      center={[-32.889, -68.833]}
      zoom={13}
      style={{ height: '70vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {pois.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]}>
          <Popup>
            <strong>{poi.name}</strong>
            <br />
            {poi.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMapView;
