import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";
import Camera from "../components/Camera";
import Mapa from "../components/Mapa";
import Microfone from "../components/Microfone";
import Informacoes from "../components/Informacoes";

// ---------- ESTILOS ----------
const Container = styled.div`
  background-color: #0a1a2b;
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const HeaderContainer = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const blink = keyframes`
  0% { color: red; }
  50% { color: yellow; }
  100% { color: red; }
`;

const BlinkingTitle = styled.div`
  animation: ${(props) => (props.active ? blink : "none")} 1s infinite;
`;

const MainArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 600px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Content = styled.div`
  background-color: #142c44;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
`;

const Modal = ({ children, onClose }) => (
  <Overlay onClick={onClose}>
    <Content onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} style={{ float: "right" }}>Fechar</button>
      {children}
    </Content>
  </Overlay>
);

const GerenciamentoAlerta = () => {
  const [alertaAtivo, setAlertaAtivo] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [camOpen, setCamOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setAlertaAtivo(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/alert/info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() =>
        setInfo([
          { label: "Motorista", value: "João Silva", type: "motorista" },
          { label: "Placa", value: "ABC-1234", type: "veiculo" },
          { label: "Veículo", value: "Caminhão 3/4", type: "veiculo" },
          { label: "Carga", value: "Eletrônicos", type: "carga" },
          { label: "Cliente", value: "Empresa XYZ", type: "cliente" },
          { label: "Destino", value: "Rua Exemplo, 123", type: "destino" },
        ])
      );
  }, []);

  // Coordenadas Ponta Grossa
  const center = { lat: -25.0913, lng: -50.1626 };

  return (
    <Container>
      <HeaderContainer>
        <FaExclamationTriangle />
        <BlinkingTitle active={alertaAtivo}>Gerenciamento de Alerta</BlinkingTitle>
        <FaExclamationTriangle />
      </HeaderContainer>

      <MainArea>
        <Column>
          <Camera setCamOpen={setCamOpen} />
          <Microfone />
        </Column>
        <Column>
          <Mapa alerta={{ latitude: center.lat, longitude: center.lng }} />
        </Column>
      </MainArea>

      <Informacoes info={info} onInfoClick={setModalType} />

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          <h2>Detalhes: {modalType}</h2>
          <p>Informações adicionais carregadas do backend.</p>
        </Modal>
      )}

      {camOpen && (
        <Modal onClose={() => setCamOpen(false)}>
          <Camera setCamOpen={() => {}} />
        </Modal>
      )}

      {mapOpen && (
        <Modal onClose={() => setMapOpen(false)}>
          <Mapa alerta={{ latitude: center.lat, longitude: center.lng }} />
        </Modal>
      )}
    </Container>
  );
};

export default GerenciamentoAlerta;
