package com.escolTech.monitoraApp.repository;

import com.escolTech.monitoraApp.model.Localizacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List; // Importe a classe List

public interface LocalizacaoRepository extends JpaRepository<Localizacao, Long> {

    // NOVO MÉTODO:
    // O Spring Data JPA cria a query automaticamente pelo nome do método.
    // "findByVeiculoId" se traduz para: "SELECT * FROM localizacao WHERE veiculo_id = ?"
    List<Localizacao> findByVeiculoId(Long veiculoId);
}