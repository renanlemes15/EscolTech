package com.escolTech.monitoraApp.controller;

import com.escolTech.monitoraApp.model.Viagem;
import com.escolTech.monitoraApp.repository.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/viagens")
public class ViagemController {

    @Autowired
    private ViagemRepository viagemRepository;

    // Listar todas as viagens
    @GetMapping
    public List<Viagem> getAllViagens() {
        return viagemRepository.findAll();
    }

    // Buscar viagem por id
    @GetMapping("/{id}")
    public ResponseEntity<Viagem> getViagemById(@PathVariable Long id) {
        Optional<Viagem> viagem = viagemRepository.findById(id);
        return viagem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Criar uma nova viagem
    @PostMapping
    public Viagem createViagem(@RequestBody Viagem viagem) {
        return viagemRepository.save(viagem);
    }

    // Atualizar uma viagem existente
    @PutMapping("/{id}")
    public ResponseEntity<Viagem> updateViagem(@PathVariable Long id, @RequestBody Viagem viagemDetails) {
        Optional<Viagem> optionalViagem = viagemRepository.findById(id);
        if (!optionalViagem.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Viagem viagem = optionalViagem.get();
        viagem.setMotorista(viagemDetails.getMotorista());
        viagem.setCliente(viagemDetails.getCliente());
        viagem.setVeiculo(viagemDetails.getVeiculo());
        viagem.setEnderecoOrigem(viagemDetails.getEnderecoOrigem());
        viagem.setEnderecoDestino(viagemDetails.getEnderecoDestino());
        // adiciona outros atributos aqui conforme sua classe

        Viagem updatedViagem = viagemRepository.save(viagem);
        return ResponseEntity.ok(updatedViagem);
    }

    // Deletar viagem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteViagem(@PathVariable Long id) {
        if (!viagemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        viagemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
