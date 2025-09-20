package com.escolTech.monitoraApp; // Mantendo o pacote original, pode mudar se quiser

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MonitoraAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonitoraAppApplication.class, args);
        System.out.println("API do Botão do Pânico iniciada com sucesso!");
    }
}
