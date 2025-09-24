import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GerenciamentoAlerta from "./pages/gerenciamentoAlerta";
import MonitoramentoMapa from "./pages/monitoramento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitoramentoMapa />} />
        <Route path="/gerenciamento-alerta" element={<GerenciamentoAlerta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
