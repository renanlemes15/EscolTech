// Motorista.java
package com.escolTech.monitoraApp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cnh;

    @OneToMany(mappedBy = "motorista", cascade = CascadeType.ALL)
    private List<Viagem> viagens;
}
