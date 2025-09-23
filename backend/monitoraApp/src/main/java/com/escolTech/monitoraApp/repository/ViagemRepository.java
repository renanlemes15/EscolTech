// ViagemRepository.java
package com.escolTech.monitoraApp.repository;

import com.escolTech.monitoraApp.model.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, Long> {
    // Aqui você já tem findAll(), findById(), save(), delete() e muito mais
}
