// MotoristaRepository.java
package com.escolTech.monitoraApp.repository;

import com.escolTech.monitoraApp.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
}
