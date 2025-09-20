// src/main/java/br/com/suaempresa/escoltaapi/service/LocalizacaoService.java
package br.com.escolterick.escolta_api.service;

import br.com.escolterick.escolta_api.dto.LocalizacaoRequestDTO;
import br.com.escolterick.escolta_api.model.Localizacao;
import br.com.escolterick.escolta_api.model.Veiculo;
import br.com.escolterick.escolta_api.repository.LocalizacaoRepository;
import br.com.escolterick.escolta_api.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // 1. Anotação que marca esta classe como um componente de serviço do Spring
public class LocalizacaoService {

    @Autowired // 2. Spring, por favor, injete uma instância do LocalizacaoRepository aqui
    private LocalizacaoRepository localizacaoRepository;

    @Autowired //    E também uma instância do VeiculoRepository
    private VeiculoRepository veiculoRepository;

    // 3. A anotação @Transactional garante que esta operação seja atômica
    @Transactional
    public Localizacao salvarLocalizacao(LocalizacaoRequestDTO dto) {
        System.out.println("### SERVIÇO: Método salvarLocalizacao chamado com DTO: " + dto);
        // Lógica de Negócio:
        // 1. Buscar o Veículo no banco de dados a partir do ID recebido no DTO
        Veiculo veiculo = veiculoRepository.findById(dto.veiculoId())
            .orElseThrow(() -> new RuntimeException("Veículo não encontrado com o ID: " + dto.veiculoId()));

        // 2. Criar uma nova entidade Localizacao
        Localizacao novaLocalizacao = new Localizacao();

        // 3. Preencher os dados da entidade com as informações do DTO e do veículo encontrado
        novaLocalizacao.setVeiculo(veiculo);
        novaLocalizacao.setLatitude(dto.latitude());
        novaLocalizacao.setLongitude(dto.longitude());
        novaLocalizacao.setVelocidade(dto.velocidade());
        novaLocalizacao.setTimestamp(dto.timestamp());

        // 4. Salvar a nova localização no banco e retornar o objeto salvo (agora com ID)
        return localizacaoRepository.save(novaLocalizacao);
    }
}