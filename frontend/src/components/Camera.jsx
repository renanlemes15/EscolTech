import React, { useRef, useEffect } from "react";

const Camera = ({ setCamOpen }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const pc = new RTCPeerConnection();

    pc.ontrack = (event) => {
      videoRef.current.srcObject = event.streams[0];
    };

    fetch("http://localhost:8080/api/webrtc/offer", {
      method: "POST",
      body: JSON.stringify({ type: "viewer" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (offer) => {
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await fetch("http://localhost:8080/api/webrtc/answer", {
          method: "POST",
          body: JSON.stringify(answer),
          headers: { "Content-Type": "application/json" },
        });
      });

    return () => pc.close();
  }, []);

  return (
    <div onClick={() => setCamOpen(true)} style={{ cursor: "pointer" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", borderRadius: "8px", background: "#000" }}
      />
    </div>
  );
};

export default Camera;
