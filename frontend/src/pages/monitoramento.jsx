import React, { useState, useEffect } from "react";
import "../index.css";

export default function MonitoramentoMapa() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    setEntregas([
      { id: 1, motorista: "João Silva", veiculo: "Caminhão 3/4", placa: "ABC-1234", carga: "Eletrônicos", destino: "São Paulo - SP", status: "Em rota" },
      { id: 2, motorista: "Maria Souza", veiculo: "Van", placa: "XYZ-5678", carga: "Medicamentos", destino: "Curitiba - PR", status: "Pendente" },
      { id: 3, motorista: "Carlos Lima", veiculo: "Caminhão 3/4", placa: "LMN-9012", carga: "Móveis", destino: "Rio de Janeiro - RJ", status: "Concluída" },
      { id: 4, motorista: "Ana Pereira", veiculo: "Moto", placa: "QWE-4567", carga: "Documentos", destino: "Belo Horizonte - MG", status: "Em rota" },
      { id: 5, motorista: "Pedro Santos", veiculo: "Van", placa: "RTY-8901", carga: "Roupas", destino: "Porto Alegre - RS", status: "Pendente" },
      { id: 6, motorista: "Luiza Costa", veiculo: "Caminhão 3/4", placa: "UIO-2345", carga: "Alimentos", destino: "Fortaleza - CE", status: "Concluída" },
    ]);
  }, []);

  return (
    <div className="container">
      <h1>Monitoramento de Entregas</h1>
      <table className="entregas-table">
        <thead>
          <tr>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Placa</th>
            <th>Carga</th>
            <th>Destino</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id} className={`status-${entrega.status.replace(" ", "").toLowerCase()}`}>
              <td>{entrega.motorista}</td>
              <td>{entrega.veiculo}</td>
              <td>{entrega.placa}</td>
              <td>{entrega.carga}</td>
              <td>{entrega.destino}</td>
              <td>{entrega.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
