package com.example.API;
// Pacote principal do projeto. Coloque todas as outras classes nesse pacote para o Spring Boot escanear automaticamente.

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// Indica que esta é a classe principal do Spring Boot
// e ativa a configuração automática do framework
public class ApiApplication {

	public static void main(String[] args) {
		// Método principal que inicia a aplicação Spring Boot
		SpringApplication.run(ApiApplication.class, args);
		System.out.println(" API do Botão do Pânico iniciada com sucesso!");
	}
}
