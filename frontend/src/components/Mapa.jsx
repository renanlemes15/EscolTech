import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"; // 👈 Importe o Tooltip
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// ... (o resto do seu código, como a correção do ícone e o componente RoutingMachine, permanece o mesmo) ...

// Correção para o ícone padrão do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RoutingMachine = ({ origin, destination, map }) => {
  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "#6FA1EC", weight: 4 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      show: false, 
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, origin, destination]);

  return null;
};


const Mapa = React.forwardRef(({ alerta }, ref) => {
  const origin = [-25.09368, -50.10424];
  const destination = [-23.56133, -46.65651];
  
  const [map, setMap] = useState(null);

  React.useImperativeHandle(ref, () => ({
    centralizarDestino() {
      if (map) {
        map.setView(destination, 15, { animate: true });
      }
    },
  }), [map]);

  return (
    <>
      <MapContainer
        center={origin}
        zoom={13}
        style={{ width: "100%", height: "500px" }}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ✅ ALTERAÇÃO AQUI */}
        <Marker position={origin}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            Local do alerta
          </Tooltip>
        </Marker>

        {/* ✅ E AQUI */}
        <Marker position={destination}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            Destino
          </Tooltip>
        </Marker>

        {map && (
          <RoutingMachine origin={origin} destination={destination} map={map} />
        )}
      </MapContainer>
    </>
  );
});

export default Mapa;