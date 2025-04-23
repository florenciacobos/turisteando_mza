---
author: "emilasheras"
llm: "gpt-4.1 (Preview)"
---

## **1. Overview**

This document details the design and implementation plan for a custom, interactive Map View using either **OpenLayers** or **Mapbox GL JS**. The goal is to provide a performant, extensible, and visually appealing map experience that integrates seamlessly with the existing codebase and leverages Points of Interest (POI) data.

---

## **2. Objectives**

- **Display an interactive map** centered on Mendoza, Argentina.
- **Render POI markers** with popups showing details.
- **Support future extensibility**: clustering, custom layers, filtering, user location, etc.
- **Integrate with existing data sources** (context, API, or static files).
- **Maintain high performance** and accessibility.

---

## **3. Requirements**

### **Functional**
- Display a map with zoom and pan controls.
- Show markers for each POI.
- On marker click, display a popup with POI details.
- Responsive design for desktop and mobile.
- Easy integration with React and existing state management.

### **Non-Functional**
- Fast initial load and smooth interactions.
- Modular, maintainable code.
- Minimal external dependencies beyond chosen map library.
- API keys and secrets managed securely.

---

## **4. Technology Selection**

### **Why OpenLayers / Mapbox GL JS?**
- **OpenLayers**: Open-source, highly customizable, no vendor lock-in, supports many formats.
- **Mapbox GL JS**: Modern, vector tiles, beautiful default styles, advanced features, but requires API key and may incur costs.

**Decision:**  
- **OpenLayers** for full open-source flexibility and no API key requirement.
- **Mapbox GL JS** if advanced styling or vector tiles are a priority and API key management is acceptable.

---

## **5. Architecture**

### **Component Structure**

```
src/
  components/
    MapView.jsx        // Main map component
    MapMarker.jsx      // Marker abstraction (optional)
  context/
    POIContext.js      // POI data provider (if not already present)
  utils/
    mapUtils.js        // Helper functions for map logic
```

### **Data Flow**

- POI data is loaded via context or props.
- `MapView` initializes the map and renders markers.
- Marker click events trigger popups with POI details.

---

## **6. Implementation Steps**

### **A. Environment Setup**

1. **Install dependencies:**
   - For OpenLayers:
     ```bash
     npm install ol
     ```
   - For Mapbox GL JS:
     ```bash
     npm install mapbox-gl
     ```

2. **Add CSS:**
   - OpenLayers:
     ```js
     import 'ol/ol.css';
     ```
   - Mapbox GL JS:
     ```js
     import 'mapbox-gl/dist/mapbox-gl.css';
     ```

---

### **B. MapView Component**

#### **OpenLayers Example Skeleton**

````jsx
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

const MapView = ({ pois }) => {
  const mapRef = useRef();

  useEffect(() => {
    const features = pois.map(poi => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([poi.lng, poi.lat])),
        name: poi.name,
        description: poi.description,
      });
      feature.setStyle(new Style({
        image: new Icon({
          src: '/marker-icon.png', // Custom marker icon
          scale: 0.05,
        }),
      }));
      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([-68.833, -32.889]), // Mendoza
        zoom: 13,
      }),
    });

    // TODO: Add popup logic here

    return () => map.setTarget(null);
  }, [pois]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapView;
````

---

### **C. Marker Popups**

- Use OpenLayers overlays for popups.
- On marker click, display a styled popup with POI details.
- Ensure accessibility (keyboard navigation, ARIA labels).

---

### **D. Data Integration**

- Fetch POI data from context, API, or static file.
- Validate and sanitize data before rendering.
- Handle loading and error states gracefully.

---

### **E. Styling & Responsiveness**

- Ensure map container is responsive.
- Style popups and markers for clarity and accessibility.
- Provide fallback for slow connections or errors.

---

### **F. Extensibility**

- Plan for future features:
  - Marker clustering for dense areas.
  - Custom layers (routes, heatmaps).
  - User geolocation.
  - Filtering and search.

---

## **7. Security & API Management**

- If using Mapbox, store API keys in environment variables.
- Never expose secrets in client-side code.
- Rate-limit API requests if fetching data dynamically.

---

## **8. Testing**

- **Unit tests:** For utility functions and data handling.
- **Integration tests:** For MapView rendering and marker logic.
- **Manual QA:** On desktop and mobile, with various POI datasets.

---

## **9. Risks & Mitigations**

| Risk                                 | Mitigation                                      |
|-------------------------------------- |-------------------------------------------------|
| Performance with large POI datasets   | Implement clustering, lazy loading              |
| API key leakage (Mapbox)              | Use env vars, never commit keys                 |
| Browser compatibility                 | Test on all target browsers                     |
| Accessibility gaps                    | Use ARIA, keyboard navigation, color contrast   |
| Map library breaking changes          | Pin versions, monitor upstream                  |

---

## **10. Timeline & Milestones**

| Milestone                | Estimated Time |
|--------------------------|---------------|
| Environment setup        | 0.5h          |
| MapView scaffolding      | 1h            |
| Marker & popup logic     | 1h            |
| Data integration         | 0.5h          |
| Styling & responsiveness | 0.5h          |
| Testing & QA             | 0.5h          |
| **Total**                | **4h**        |

---

## **11. Deliverables**

- `MapView` component with interactive map and POI markers.
- Popup details on marker click.
- Responsive, accessible UI.
- Documentation for setup and extensibility.

---

## **12. Future Enhancements**

- Marker clustering.
- Custom map styles.
- User geolocation.
- Advanced filtering/search.
- Export to static image/PDF.

---

## Estado actual (2025-04-23)

- PoC de OpenLayers implementado en `OpenLayersMapView.jsx` usando datos mock de Mendoza.
- LeafletMapView sigue disponible para comparación.
- No se utiliza MapService ni tests automáticos en esta etapa.
- Documentación enfocada en decisiones y hallazgos, no en detalles de código.

## Decisiones

- Prototipado directo en componentes React.
- Alternancia manual entre implementaciones en `App.jsx`.
- Se prioriza la exploración y validación visual.

## Próximos pasos

- Evaluar experiencia y performance.
- Decidir si se avanza con OpenLayers o se explora Mapbox GL JS.
- Documentar hallazgos y aprendizajes.

---

## **13. References**

- [OpenLayers Documentation](https://openlayers.org/en/latest/doc/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [React Integration Examples](https://github.com/openlayers/openlayers/issues/10084)
