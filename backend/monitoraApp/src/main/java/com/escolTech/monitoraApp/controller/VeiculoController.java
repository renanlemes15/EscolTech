package com.escolTech.monitoraApp.controller;

import com.escolTech.monitoraApp.dto.VeiculoRequestDTO;
import com.escolTech.monitoraApp.model.Veiculo;
import com.escolTech.monitoraApp.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/veiculos") // URL base para todos os métodos neste controller
public class VeiculoController {

    @Autowired // Injeta nosso novo serviço
    private VeiculoService veiculoService;

    @PostMapping // Mapeia este método para requisições POST
    public ResponseEntity<Veiculo> cadastrarVeiculo(@RequestBody VeiculoRequestDTO dto) {
        Veiculo veiculoSalvo = veiculoService.criarVeiculo(dto);

        // Retorna o status 201 Created, que é a melhor prática para criação de recursos.
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoSalvo);
    }
}