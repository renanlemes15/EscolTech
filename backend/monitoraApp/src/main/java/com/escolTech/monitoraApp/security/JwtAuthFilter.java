package br.com.escolterick.escolta_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String deviceId;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        deviceId = jwtService.extractDeviceId(jwt);

        if (deviceId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtService.isTokenValid(jwt, deviceId)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        deviceId,
                        null,
                        null // Autorizações/Roles (nenhuma por enquanto)
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Atualiza o SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // LINHA DE DEBUG NO LUGAR CERTO
                System.out.println("### SUCESSO: Usuário '" + deviceId + "' autenticado com sucesso.");
            }
        }
        
        // ESTA CHAMADA DEVE FICAR AQUI NO FINAL
        filterChain.doFilter(request, response);
    }
}