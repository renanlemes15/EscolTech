// src/main/java/br/com/suaempresa/escoltaapi/controller/LocalizacaoController.java
package br.com.escolterick.escolta_api.controller;
// src/main/java/br/com/suaempresa/escoltaapi/controller/LocalizacaoController.java

import br.com.escolterick.escolta_api.dto.LocalizacaoRequestDTO;
import br.com.escolterick.escolta_api.model.Localizacao;
import br.com.escolterick.escolta_api.service.LocalizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/localizacoes")
public class LocalizacaoController {

    // Injetamos o nosso novo Service
    @Autowired
    private LocalizacaoService localizacaoService;

    @PostMapping
    public ResponseEntity<Localizacao> receberLocalizacao(@RequestBody LocalizacaoRequestDTO dto) {
        // A única responsabilidade do Controller agora é chamar o Service
        Localizacao localizacaoSalva = localizacaoService.salvarLocalizacao(dto);
        
        // Retornamos um status 200 OK e o objeto que foi salvo no corpo da resposta
        return ResponseEntity.ok(localizacaoSalva);
    }
}