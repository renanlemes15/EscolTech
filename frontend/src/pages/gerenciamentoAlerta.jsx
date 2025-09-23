import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";
import Camera from "../components/Camera";
import Mapa from "../components/Mapa";
import Microfone from "../components/Microfone";
import Informacoes from "../components/Informacoes";

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
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  z-index: 1000;
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
  const [modalData, setModalData] = useState(null);
  const [info, setInfo] = useState([]);
  const [rota, setRota] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setAlertaAtivo(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Buscar informações do backend
  useEffect(() => {
    fetch("http://localhost:8080/viagens/1") // Ajuste o ID da viagem conforme necessário
      .then((res) => res.json())
      .then((data) => {
        const infoFormatada = [
          { label: "Motorista", value: data.motorista.nome, type: "motorista", id: data.motorista.id },
          { label: "Placa", value: data.veiculo.placa, type: "veiculo" },
          { label: "Veículo", value: data.veiculo.modelo, type: "veiculo", id: data.veiculo.id },
          { label: "Carga", value: data.carga, type: "carga" },
          { label: "Cliente", value: data.cliente.nome, type: "cliente", id: data.cliente.id },
          { label: "Destino", value: data.destino, type: "destino", coordinates: data.destinoCoordenadas },
        ];
        setInfo(infoFormatada);
        // Começar a rota
        if(data.motorista.latitude && data.motorista.longitude){
          setRota([{ lat: data.motorista.latitude, lng: data.motorista.longitude }, data.destinoCoordenadas]);
        }
      })
      .catch(() => console.log("Erro ao buscar informações do backend"));
  }, []);

  // Função pra abrir modal com info detalhada
  const handleInfoClick = (item) => {
    if (!["motorista", "veiculo", "cliente", "destino"].includes(item.type)) return;

    fetch(`http://localhost:8080/${item.type}s/${item.id}`)
      .then(res => res.json())
      .then(data => setModalData(data))
      .catch(() => setModalData({ info: "Erro ao carregar dados" }));

    setModalType(item.type);
  };

  // Coordenadas Ponta Grossa como default
  const center = rota.length ? rota[0] : { lat: -25.0913, lng: -50.1626 };

  return (
    <Container>
      <HeaderContainer>
        <FaExclamationTriangle />
        <BlinkingTitle active={alertaAtivo}>PÂNICO</BlinkingTitle>
        <FaExclamationTriangle />
      </HeaderContainer>

      <MainArea>
        <Column>
          <Camera setCamOpen={setCamOpen} />
          <Microfone />
        </Column>
        <Column>
          <Mapa alerta={center} rota={rota} />
        </Column>
      </MainArea>

      <Informacoes info={info} onInfoClick={handleInfoClick} />

      {modalType && (
        <Modal onClose={() => { setModalType(null); setModalData(null); }}>
          <h2>{modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h2>
          <pre>{modalData ? JSON.stringify(modalData, null, 2) : "Carregando..."}</pre>
        </Modal>
      )}

      {camOpen && (
        <Modal onClose={() => setCamOpen(false)}>
          <Camera setCamOpen={() => {}} />
        </Modal>
      )}

      {mapOpen && (
        <Modal onClose={() => setMapOpen(false)}>
          <Mapa alerta={center} rota={rota} />
        </Modal>
      )}
    </Container>
  );
};

export default GerenciamentoAlerta;
