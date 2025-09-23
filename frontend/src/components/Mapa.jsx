import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Mapa = ({ alerta, rota }) => {
  const [posicaoAtual, setPosicaoAtual] = useState(
  alerta ? [alerta.lat, alerta.lng] : [-25.0913, -50.1626]
);

  useEffect(() => {
    setPosicaoAtual(alerta ? [alerta.latitude, alerta.longitude] : posicaoAtual);
  }, [alerta]);

  // Atualização simulada da posição do motorista (exemplo: a cada 5s a posição anda)
  useEffect(() => {
    if (!rota || rota.length < 2) return;

    const interval = setInterval(() => {
      setPosicaoAtual((prev) => {
        const destino = rota[1];
        const deltaLat = (destino.lat - prev[0]) * 0.05; // 5% do caminho por tick
        const deltaLng = (destino.lng - prev[1]) * 0.05;

        const novaPos = [
          prev[0] + (Math.abs(destino.lat - prev[0]) < 0.0001 ? 0 : deltaLat),
          prev[1] + (Math.abs(destino.lng - prev[1]) < 0.0001 ? 0 : deltaLng),
        ];
        return novaPos;
      });
    }, 1000); // atualiza a cada 1s

    return () => clearInterval(interval);
  }, [rota]);

  const linhas = rota ? [[posicaoAtual, rota[1]]] : [];

  return (
    <MapContainer
      center={posicaoAtual}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Marcador do motorista */}
      <Marker position={posicaoAtual}>
        <Popup>Motorista</Popup>
      </Marker>

      {/* Marcador do destino */}
      {rota && rota[1] && (
        <Marker position={rota[1]}>
          <Popup>Destino</Popup>
        </Marker>
      )}

      {/* Linha da rota */}
      {linhas.map((linha, idx) => (
        <Polyline key={idx} positions={linha} color="red" />
      ))}
    </MapContainer>
  );
};

export default Mapa;
