import React, { useRef, useState, useEffect } from "react";

const Microfone = () => {
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  const iniciarGravacao = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");

        fetch("http://localhost:8080/api/audio/upload", {
          method: "POST",
          body: formData,
        }).then(() => console.log("Áudio enviado"));
      };

      mediaRecorderRef.current.start();
      setGravando(true);
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setGravando(false);
    }
  };

  useEffect(() => {
    audioRef.current.src = "http://localhost:8080/api/audio/stream";
    audioRef.current.play().catch((e) =>
      console.error("Erro no áudio remoto:", e)
    );
  }, []);

  return (
    <div>
      {!gravando ? (
        <button onClick={iniciarGravacao} style={{ marginTop: "10px" }}>
          🎤 Ativar Microfone
        </button>
      ) : (
        <button onClick={pararGravacao} style={{ marginTop: "10px" }}>
          ⏹️ Parar Envio
        </button>
      )}
      <audio ref={audioRef} controls style={{ marginTop: "10px" }} />
    </div>
  );
};

export default Microfone;
