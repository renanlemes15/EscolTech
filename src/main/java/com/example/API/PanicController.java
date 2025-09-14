package com.example.API;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// Indica que esta classe é um controller REST
@RequestMapping("/api/panic")
// Define a URL base do endpoint
public class PanicController {

    @PostMapping
    // Recebe requisições POST na URL /api/panic
    public ResponseEntity<String> triggerPanic(@RequestBody PanicRequest request) {
        // @RequestBody converte o JSON recebido em objeto PanicRequest

        // Processa o sinal do botão do pânico
        System.out.println("🚨 Botão do pânico acionado!");
        System.out.println("Usuário: " + request.getUserId());
        System.out.println("Localização: " + request.getLocation());
        System.out.println("Horário: " + request.getTimestamp());

        return ResponseEntity.ok("Sinal recebido com sucesso!");
        // Retorna status 200 OK ao Android
    }
}
