// ClienteRepository.java
package com.escolTech.monitoraApp.repository;

import com.escolTech.monitoraApp.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
