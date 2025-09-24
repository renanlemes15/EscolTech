import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook para fazer a navegação
import "../index.css";

// Importe as bibliotecas do WebSocket
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function MonitoramentoMapa () {
  // O estado 'entregas' continua o mesmo para exibir os dados na tabela
  const [entregas, setEntregas] = useState([]);
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Simula o carregamento inicial dos dados da tabela
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


  // Este useEffect é dedicado a configurar a conexão WebSocket
  useEffect(() => {
    // 1. Cria um cliente STOMP. STOMP é um protocolo de mensagens sobre WebSocket.
    const stompClient = new Client({
      // 2. Define como o cliente vai se conectar. Usamos SockJS para garantir
      //    compatibilidade com navegadores mais antigos ou proxies.
      //    A URL deve apontar para o endpoint que você configurou no Spring Boot.
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-monitor'),
      
      // 3. Callback que é executado quando a conexão é bem-sucedida.
      onConnect: () => {
        console.log('Conectado ao servidor WebSocket!');

        // 4. Se inscreve (subscribe) no tópico de alertas.
        //    Qualquer mensagem enviada pelo backend para "/topic/alerts"
        //    será recebida aqui.
        stompClient.subscribe('/topic/alerts', (message) => {
          console.log('Mensagem de alerta recebida:', message.body);
          const alertData = JSON.parse(message.body); // Converte a mensagem (JSON string) para um objeto

          // 5. AÇÃO PRINCIPAL: Navega para a página de gerenciamento de alertas.
          //    Opcional: Passamos os dados do alerta para a outra página através do `state`.
          navigate('/gerenciamento-alerta', { state: { alert: alertData } });
        });
      },

      // Funções para ajudar a depurar em caso de erros
      onStompError: (frame) => {
        console.error('Erro no Broker:', frame.headers['message']);
        console.error('Detalhes:', frame.body);
      },
      onWebSocketError: (error) => {
        console.error('Erro na conexão WebSocket:', error);
      }
    });

    // 6. Ativa a conexão com o servidor.
    stompClient.activate();

    // 7. Função de "limpeza": é executada quando o componente é "desmontado" (ex: quando o usuário muda de página).
    //    Isso é MUITO IMPORTANTE para evitar conexões duplicadas e vazamentos de memória.
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log('Desconectado do WebSocket.');
      }
    };
  }, [navigate]); // O `Maps` é uma dependência, então o colocamos aqui.

  // O JSX para renderizar a página continua o mesmo
  return (
    <div className="container">
      <h1>Monitoramento de Entregas</h1>
      <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', margin: '10px 0' }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#2c7a2c' }}>🟢 Conectado ao servidor. Aguardando alertas em tempo real...</p>
      </div>
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