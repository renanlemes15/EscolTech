import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
`;

const Item = styled.div`
  cursor: pointer;
  background-color: #142c44;
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1f3b5a;
  }
`;

function Informacoes({ info, onInfoClick }) {
  return (
    <Container>
           {info.map((item, i) => (
        <Item key={i} onClick={() => onInfoClick(item.type)}>
          <strong>{item.label}:</strong> {item.value}
        </Item>
      ))}
    </Container>
  );
}

export default Informacoes;

