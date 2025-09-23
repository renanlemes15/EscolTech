import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Mapa = ({ alerta }) => {
  // Coordenadas ajustadas para o estacionamento em frente à Central de Salas
  const center = [-25.09368, -50.10424]; 

  return (
    <MapContainer center={center} zoom={18} style={{ width: "100%", height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {/* Marcador indicando o ponto de encontro/estacionamento */}
      <Marker position={center}>
        <Popup>Ponto de encontro | Estacionamento</Popup>
      </Marker>

      {/* Marcador do alerta, se houver */}
      {alerta && (
        <Marker position={[alerta.latitude, alerta.longitude]}>
          <Popup>Local do alerta</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Mapa;