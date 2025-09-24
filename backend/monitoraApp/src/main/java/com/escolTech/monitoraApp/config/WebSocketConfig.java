package com.escolTech.monitoraApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // A SOLUÇÃO FINAL:
        // Usamos .setAllowedOriginPatterns() que é mais flexível e seguro que .setAllowedOrigins()
        // e funciona corretamente com as configurações padrão de credenciais do SockJS.
        // E especificamos a origem correta do seu frontend: http://localhost:3001
        registry.addEndpoint("/ws-monitor")
                .setAllowedOriginPatterns("http://localhost:3001") 
                .withSockJS();
    }
}

