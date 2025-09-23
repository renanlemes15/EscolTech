// Veiculo.java
package com.escolTech.monitoraApp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String modelo;
    private String cor;

    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL)
    private List<Viagem> viagens;
}
