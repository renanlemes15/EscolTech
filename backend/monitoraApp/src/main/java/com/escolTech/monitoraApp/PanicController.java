package com.escolTech.monitoraApp;

import com.escolTech.monitoraApp.model.PanicRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate; // Importe esta classe
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/panic")
public class PanicController {

    // Injete o template de mensageria do Spring
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<String> triggerPanic(@RequestBody PanicRequest request) {
        System.out.println("🚨 Alerta de pânico recebido do app móvel para o usuário: " + request.getUserId());

        // A lógica de negócio continua aqui (salvar no banco, etc.)

        // AGORA, ENVIE A NOTIFICAÇÃO VIA WEBSOCKET
        // Todos os clientes (navegadores) inscritos em "/topic/alerts" receberão esta mensagem.
        // O objeto "request" será convertido para JSON e enviado.
        messagingTemplate.convertAndSend("/topic/alerts", request);

        System.out.println("Notificação de alerta enviada via WebSocket para o tópico /topic/alerts");

        // Retorna a resposta para o app móvel
        return ResponseEntity.ok("Sinal de pânico recebido e processado!");
    }
}