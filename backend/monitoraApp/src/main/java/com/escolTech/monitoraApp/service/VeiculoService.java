package com.escolTech.monitoraApp.service;

import com.escolTech.monitoraApp.dto.VeiculoRequestDTO;
import com.escolTech.monitoraApp.model.Veiculo;
import com.escolTech.monitoraApp.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // Marca esta classe como um serviço do Spring
public class VeiculoService {

    @Autowired // Injeta o repositório de veículos
    private VeiculoRepository veiculoRepository;

    public Veiculo criarVeiculo(VeiculoRequestDTO dto) {
        // 1. Cria uma nova entidade Veiculo
        Veiculo novoVeiculo = new Veiculo();

        // 2. Preenche a entidade com os dados recebidos do DTO
        novoVeiculo.setPlaca(dto.placa());
        novoVeiculo.setModelo(dto.modelo());
        novoVeiculo.setCor(dto.cor());

        // 3. Salva a nova entidade no banco de dados e a retorna
        return veiculoRepository.save(novoVeiculo);
    }
}