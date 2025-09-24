import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonitoramentoMapa from "./pages/monitoramento";
import GerenciamentoAlerta from "./pages/gerenciamentoAlerta";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitoramentoMapa />} />
        <Route path="/gerenciamento-alerta" element={<GerenciamentoAlerta />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
