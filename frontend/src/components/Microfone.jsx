import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const MicrofoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

const BotaoMicrofone = styled.button`
  background-color: ${(props) => (props.gravando ? "#ff6b6b" : "#1f3b5a")};
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.1s ease;

  ${(props) =>
    props.gravando &&
    css`
      animation: ${pulse} 1s infinite;
    `};

  &:hover {
    background-color: ${(props) => (props.gravando ? "#ff5252" : "#2a4a6f")};
    transform: scale(1.05);
  }
`;

const AudioPlayer = styled.audio`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  outline: none;
`;

const Microfone = () => {
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "http://localhost:8080/api/audio/stream";
      audioRef.current
        .play()
        .catch((e) => console.error("Erro no áudio remoto:", e));
    }
  }, []);

  return (
    <MicrofoneWrapper>
      <BotaoMicrofone gravando={gravando} onClick={gravando ? pararGravacao : iniciarGravacao}>
        {gravando ? "⏹️ Parar Gravação" : "🎤 Ativar Microfone"}
      </BotaoMicrofone>
      <AudioPlayer ref={audioRef} controls />
    </MicrofoneWrapper>
  );
};

export default Microfone;
