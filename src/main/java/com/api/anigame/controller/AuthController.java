package com.api.anigame.controller;

import com.api.anigame.dto.RefreshTokenReqDTO;
import com.api.anigame.dto.UserCredentialsReqDTO;
import com.api.anigame.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody UserCredentialsReqDTO credentialsReqDTO){
        return authService.login(credentialsReqDTO);
    }

    @PostMapping("/login/refresh")
    public ResponseEntity<?> refreshLogin (@RequestBody RefreshTokenReqDTO refreshTokenReqDTO){
        return authService.refreshLogin(refreshTokenReqDTO.refreshToken());
    }

}
