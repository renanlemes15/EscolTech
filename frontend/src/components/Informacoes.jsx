import React from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const InfoCard = styled.div`
  background-color: #1f3b5c;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  min-width: 150px;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  opacity: ${(props) => (props.clickable ? 1 : 0.7)};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.clickable ? "#2a4d78" : "#1f3b5c")};
  }
`;

const Informacoes = ({ info, onInfoClick }) => {
  return (
    <InfoContainer>
      {info.map((item) => {
        // A alteração foi feita aqui, removendo "destino" do array
        const clickable = ["motorista", "veiculo", "cliente"].includes(item.type) && item.label !== "Placa";
        return (
          <InfoCard
            key={item.label}
            clickable={clickable}
            onClick={() => clickable && onInfoClick(item)}
          >
            <strong>{item.label}:</strong> {item.value}
          </InfoCard>
        );
      })}
    </InfoContainer>
  );
};

export default Informacoes;