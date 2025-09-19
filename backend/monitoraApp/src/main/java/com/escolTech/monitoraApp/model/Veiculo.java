
package com.escolTech.monitoraApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data 
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String placa;
    private String modelo;
    private String cor;
    
}