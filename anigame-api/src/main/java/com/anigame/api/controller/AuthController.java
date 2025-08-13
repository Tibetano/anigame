package com.anigame.api.controller;

import com.anigame.api.dto.*;
import com.anigame.api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

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

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshLogin (@RequestBody RefreshTokenReqDTO refreshTokenReqDTO){
        return authService.refreshLogin(refreshTokenReqDTO.refreshToken());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout (@RequestBody RefreshTokenReqDTO refreshTokenReqDTO) {
        return authService.revokeRefreshToken(refreshTokenReqDTO.refreshToken());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile (@RequestHeader("Authorization") String authorizationHeader) {
        return authService.getProfile(authorizationHeader.replace("Bearer ",""));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser (@RequestBody UserReqDTO userReqDTO, UriComponentsBuilder uriBuilder) {
        var newUser = authService.register(userReqDTO);
        URI location = uriBuilder.path("/users/{id}")
                .buildAndExpand(newUser.id())
                .toUri();
        return ResponseEntity.created(location).body(newUser);
    }

    @PostMapping("/verify-user")
    public ResponseEntity<?> verifyUser (@RequestBody VerificationTokenReqDTO token) {
        authService.verifyUser(UUID.fromString(token.token()));
        return ResponseEntity.ok("User verified successfully.");
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification (@RequestBody EmailReqDTO req) {
        authService.resendVerificationToken(req.email());
        return ResponseEntity.ok("New validation link sent successfully.");
    }







    @PostMapping("/nl-reset-password")
    public ResponseEntity<?> resetPassword (@RequestBody NLNewPasswordReqDTO req) {
        authService.resetPassword(req);
        return ResponseEntity.ok("Password reseted successfully.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword (@RequestBody EmailReqDTO req) {
        authService.forgotPassword(req.email());
        return ResponseEntity.ok("New validation link sent successfully.");
    }

    @PostMapping("/l-reset-password")
    public ResponseEntity<?> lResetPassword (@RequestBody LNewPasswordReqDTO req, @RequestHeader("Authorization") String authorizationHeader) {
        authService.lResetPassword(req, authorizationHeader.replace("Bearer ",""));
        return ResponseEntity.ok("Password reseted successfully.");
    }

}
