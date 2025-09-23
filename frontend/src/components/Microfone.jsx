import React, { useRef, useState, useEffect } from "react";

const Microfone = () => {
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  // Injeta os estilos na cabeça do documento para evitar a dependência de styled-components
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      .microfone-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        margin-top: 20px;
      }

      .botao-microfone {
        background-color: #1f3b5a;
        color: white;
        border: none;
        padding: 14px 24px;
        border-radius: 50px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.1s ease;
      }

      .botao-microfone:hover {
        background-color: #2a4a6f;
        transform: scale(1.05);
      }

      .botao-microfone.gravando {
        background-color: #ff6b6b;
        animation: pulse 1s infinite;
      }
      
      .botao-microfone.gravando:hover {
        background-color: #ff5252;
      }
    `;
    document.head.appendChild(style);

    // Função de limpeza para remover o estilo quando o componente é desmontado
    return () => {
      document.head.removeChild(style);
    };
  }, []); // O array de dependências vazio garante que isso seja executado apenas uma vez

  const iniciarGravacao = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        try {
          const formData = new FormData();
          formData.append("file", blob, "audio.webm");

          const response = await fetch("http://localhost:8080/api/audio/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Falha no envio do áudio");
          console.log("Áudio enviado com sucesso!");
        } catch (err) {
          console.error("Erro ao enviar áudio:", err);
        }
      };

      mediaRecorder.start();
      setGravando(true);
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current && gravando) {
      mediaRecorderRef.current.stop();
      setGravando(false);
    }
  };

  return (
    <div className="microfone-wrapper">
      <button 
        className={`botao-microfone ${gravando ? "gravando" : ""}`} 
        onClick={gravando ? pararGravacao : iniciarGravacao}
      >
        {gravando ? "⏹️ Parar Gravação" : "🎤 Ativar Microfone"}
      </button>
    </div>
  );
};

export default Microfone;

