// GerenciamentoAlerta.js
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
  const [modalData, setModalData] = useState(null);
  const [camOpen, setCamOpen] = useState(false);
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
          { label: "Placa", value: "ABC-1234", type: "placa" },
          { label: "Veículo", value: "Caminhão 3/4", type: "veiculo" },
          { label: "Carga", value: "Eletrônicos", type: "carga" },
          { label: "Cliente", value: "Empresa XYZ", type: "cliente" },
          { label: "Destino", value: "São Paulo - SP", type: "destino" },
        ])
      );
  }, []);

  const center = { lat: -25.0913, lng: -50.1626 };

  const getDetalhes = (type) => {
    switch(type) {
      case "motorista":
        return {
          Nome: "João Silva",
          CPF: "123.456.789-00",
          RG: "12.345.678-9",
          Idade: 34,
          ID: "MTR-001",
          CNH: "AB1234567",
          ValidadeCNH: "12/2028"
        };
      case "veiculo":
        return {
          Modelo: "Caminhão 3/4 Mercedes-Benz",
          Placa: "ABC-1234",
          Ano: 2018,
          Cor: "Vermelho",
          Capacidade: "3 toneladas",
          Renavam: "12345678901",
          TipoCombustivel: "Diesel"
        };
      case "cliente":
        return {
          Nome: "Empresa XYZ Ltda",
          CNPJ: "12.345.678/0001-90",
          Contato: "contato@empresa.com",
          Telefone: "(11) 99999-8888",
          Endereço: "Av. Paulista, 1000, São Paulo - SP"
        };
      default:
        return null;
    }
  };

  const handleInfoClick = (item) => {
    const detalhes = getDetalhes(item.type);
    if(detalhes) setModalData({ title: item.label, details: detalhes });
  };

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
          <Mapa alerta={{ latitude: center.lat, longitude: center.lng }} />
        </Column>
      </MainArea>

      <Informacoes info={info} onInfoClick={handleInfoClick} />

      {modalData && (
        <Modal onClose={() => setModalData(null)}>
          <h2>{modalData.title}</h2>
          <ul>
            {Object.entries(modalData.details).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </Modal>
      )}

      {camOpen && (
        <Modal onClose={() => setCamOpen(false)}>
          <Camera setCamOpen={() => {}} />
        </Modal>
      )}
    </Container>
  );
};

export default GerenciamentoAlerta;
