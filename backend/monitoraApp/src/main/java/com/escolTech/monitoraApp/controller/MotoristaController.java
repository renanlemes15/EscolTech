package com.escolTech.monitoraApp.controller;

import com.escolTech.monitoraApp.model.Motorista;
import com.escolTech.monitoraApp.repository.MotoristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/motoristas")
public class MotoristaController {

    @Autowired
    private MotoristaRepository motoristaRepository;

    @GetMapping
    public List<Motorista> getAllMotoristas() {
        return motoristaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motorista> getMotoristaById(@PathVariable Long id) {
        Optional<Motorista> motorista = motoristaRepository.findById(id);
        return motorista.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Motorista createMotorista(@RequestBody Motorista motorista) {
        return motoristaRepository.save(motorista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Motorista> updateMotorista(@PathVariable Long id, @RequestBody Motorista motoristaDetails) {
        Optional<Motorista> optionalMotorista = motoristaRepository.findById(id);
        if (!optionalMotorista.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Motorista motorista = optionalMotorista.get();
        motorista.setNome(motoristaDetails.getNome());
        // adiciona outros atributos conforme sua classe

        return ResponseEntity.ok(motoristaRepository.save(motorista));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMotorista(@PathVariable Long id) {
        if (!motoristaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        motoristaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
