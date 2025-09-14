package com.example.API;
// Pacote da aplicação definido como com.example.API

public class PanicRequest {
    // Classe que representa os dados que o Android envia para a API.

    private String userId;
    // Identificador do usuário que acionou o botão.

    private String location;
    // Localização do usuário (latitude/longitude ou endereço).

    private String timestamp;
    // Data/hora em que o botão foi pressionado.

    // --- Getters e Setters ---
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
