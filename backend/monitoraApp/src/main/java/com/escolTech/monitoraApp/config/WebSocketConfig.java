// Crie um novo arquivo: WebSocketConfig.java
package com.escolTech.monitoraApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Habilita o processamento de mensagens via WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilita um "broker" de mensagens simples para os destinos que começam com "/topic"
        // É para cá que o frontend vai se inscrever.
        config.enableSimpleBroker("/topic");
        // Define o prefixo para os endpoints que receberão mensagens dos clientes (não usaremos neste exemplo).
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Registra o endpoint que o JavaScript usará para se conectar ao WebSocket.
        // O withSockJS() oferece uma alternativa caso o WebSocket não seja suportado pelo navegador.
        registry.addEndpoint("/ws-monitor").withSockJS();
    }
}