import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Mapa = ({ alerta }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "SUA_CHAVE_API_GOOGLE_MAPS", // 🔑 INSERIR A CHAVE API
  });

  const center = { lat: -25.0913, lng: -50.1626 }; // Centraliza em Ponta Grossa - PR

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {alerta && (
        <Marker
          position={{ lat: alerta.latitude, lng: alerta.longitude }}
          title="Local do alerta"
        />
      )}
    </GoogleMap>
  ) : (
    <div>Carregando mapa...</div>
  );
};

export default Mapa;