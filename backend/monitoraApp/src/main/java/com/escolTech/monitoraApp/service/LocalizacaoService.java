package com.escolTech.monitoraApp.service;

import com.escolTech.monitoraApp.dto.LocalizacaoRequestDTO;
import com.escolTech.monitoraApp.model.Localizacao;
import com.escolTech.monitoraApp.model.Veiculo;
import com.escolTech.monitoraApp.repository.LocalizacaoRepository;
import com.escolTech.monitoraApp.repository.VeiculoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate; // <- IMPORTANTE
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocalizacaoService {

    @Autowired
    private LocalizacaoRepository localizacaoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    // INJETANDO A FERRAMENTA DE MENSAGENS WEBSOCKET
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Transactional
    public Localizacao salvarLocalizacao(LocalizacaoRequestDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado com o ID: " + dto.veiculoId()));

        Localizacao novaLocalizacao = new Localizacao();
        novaLocalizacao.setVeiculo(veiculo);
        novaLocalizacao.setLatitude(dto.latitude());
        novaLocalizacao.setLongitude(dto.longitude());
        novaLocalizacao.setVelocidade(dto.velocidade());
        novaLocalizacao.setTimestamp(LocalDateTime.now());

        Localizacao localizacaoSalva = localizacaoRepository.save(novaLocalizacao);

        // APÓS SALVAR, ENVIE A LOCALIZAÇÃO PARA O WEBSOCKET
        // O destino "/topic/localizacoes" é o canal que definimos na WebSocketConfig
        messagingTemplate.convertAndSend("/topic/localizacoes", localizacaoSalva);

        return localizacaoSalva;
    }

    public List<Localizacao> buscarHistoricoPorVeiculo(Long veiculoId) {
        return localizacaoRepository.findByVeiculoId(veiculoId);
    }
}