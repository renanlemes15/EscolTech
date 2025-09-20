// src/main/java/br/com/suaempresa/escoltaapi/security/JwtService.java
package br.com.escolterick.escolta_api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    /**
     * Gera o token JWT para um determinado deviceId (Subject).
     */
    public String generateToken(String deviceId) {
        return Jwts.builder()
                .setSubject(deviceId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                // AQUI ESTÁ A MUDANÇA PRINCIPAL
                .signWith(getSignInKey()) 
                .compact();
    }

    /**
     * Extrai o ID do dispositivo (Subject) do token.
     */
    public String extractDeviceId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Verifica se o token é válido para um determinado deviceId.
     */
    public boolean isTokenValid(String token, String deviceId) {
        final String extractedDeviceId = extractDeviceId(token);
        return (extractedDeviceId.equals(deviceId)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Método genérico para extrair qualquer "claim" (informação) do token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extrai todas as informações do corpo (payload) do token usando a chave de assinatura.
     */
    private Claims extractAllClaims(String token) {
        // O parser também usa a nova abordagem com o objeto Key
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Método auxiliar que converte a chave secreta (String) em um objeto Key seguro.
     * Esta é a prática recomendada pela biblioteca jjwt.
     */
    private Key getSignInKey() {
    // ADICIONE ESTA LINHA PARA DEBUG
    System.out.println("### CHAVE SECRETA CARREGADA: '" + this.secretKey + "'");

    byte[] keyBytes = this.secretKey.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
    }
}