package com.escolTech.monitoraApp.repository;

import com.escolTech.monitoraApp.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
}