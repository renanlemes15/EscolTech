package br.com.escolterick.escolta_api.repository;

import br.com.escolterick.escolta_api.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
}