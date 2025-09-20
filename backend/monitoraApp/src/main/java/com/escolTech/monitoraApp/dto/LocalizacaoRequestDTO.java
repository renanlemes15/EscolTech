// src/main/java/br/com/suaempresa/escoltaapi/dto/LocalizacaoRequestDTO.java
package com.escolTech.monitoraApp.dto;

import java.time.LocalDateTime;

public record LocalizacaoRequestDTO(
    Long veiculoId,
    Double latitude,
    Double longitude,
    Double velocidade,
    LocalDateTime timestamp
) {}