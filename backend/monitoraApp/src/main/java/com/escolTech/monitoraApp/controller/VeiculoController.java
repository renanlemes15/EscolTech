package br.com.escolterick.escolta_api.controller;

import br.com.escolterick.escolta_api.dto.VeiculoRequestDTO;
import br.com.escolterick.escolta_api.model.Veiculo;
import br.com.escolterick.escolta_api.service.VeiculoService;
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