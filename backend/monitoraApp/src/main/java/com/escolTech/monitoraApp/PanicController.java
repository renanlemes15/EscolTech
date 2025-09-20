package com.escolTech.monitoraApp;

import com.escolTech.monitoraApp.model.PanicRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/panic")
public class PanicController {

    @PostMapping
    public ResponseEntity<String> triggerPanic(@RequestBody PanicRequest request) {

        System.out.println("🚨 Botão do pânico acionado!");
        System.out.println("Usuário: " + request.getUserId());
        System.out.println("Localização: " + request.getLocation());
        System.out.println("Horário: " + request.getTimestamp());

        // Aqui você pode salvar no banco ou disparar notificações

        return ResponseEntity.ok("Sinal recebido com sucesso!");
    }
}
