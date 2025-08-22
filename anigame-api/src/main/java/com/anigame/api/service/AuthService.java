package com.anigame.api.service;

import com.anigame.api.dto.*;
import com.anigame.api.persistence.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    @Value("${expire-times.access-token}")
    private Long accessTokenExpiresTime;
    @Value("${expire-times.refresh-token}")
    private Long refreshTokenExpiresTime;

    @Value("${app.url}")
    private String appURL;
    @Value("${app.port}")
    private String appPORT;
    @Value("${app.verify-email-endpoint}")
    private String appVERIFYEMAILENDPOINT;
    @Value("${app.new-password-endpoint}")
    private String appNEWPASSWORDENDPOINT;

    private final UserService userService;
    private final EmailService mailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService tokenService;

    public AuthService(UserService userService, EmailService mailService, BCryptPasswordEncoder bCryptPasswordEncoder, TokenService tokenService) {
        this.userService = userService;
        this.mailService = mailService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.tokenService = tokenService;
    }

    public UserCredentialsResDTO getCredentials (UserEntity user) {
        var now = Instant.now();
        var expiresIn = accessTokenExpiresTime;
        var accessToken = tokenService.createAccessToken(user, now, accessTokenExpiresTime);
        var refreshToken = tokenService.createRefreshToken(user, now, refreshTokenExpiresTime);
        return new UserCredentialsResDTO(accessToken, refreshToken, expiresIn);
    }

    public ResponseEntity<?> login (UserCredentialsReqDTO userCredentialsReqDTO) {
        var user = userService.findByUsername(userCredentialsReqDTO.username());
        if (!bCryptPasswordEncoder.matches(userCredentialsReqDTO.password(),user.getPassword())) {
            throw new BadCredentialsException("Invalid user or password!");
        }
        return ResponseEntity.ok(getCredentials(user));
    }

    @Transactional
    public ResponseEntity<?> refreshLogin (String oldRefreshToken) {
        var userId = tokenService.validateRefreshToken(oldRefreshToken)
                .getUser().getId().toString();
        var user = userService.findById(UUID.fromString(userId));
        return ResponseEntity.ok(getCredentials(user));
    }

    public ResponseEntity<?> revokeRefreshToken (String refreshToken) {
        return ResponseEntity.ok(tokenService.revokeRefreshToken(refreshToken));
    }

    public ResponseEntity<?> getProfile(String token) {
        var userId = tokenService.getUserIdFromToken(token);
        return userService.get(userId);
    }

    public UserResDTO register (UserReqDTO userReqDTO) {
        var user = userService.create(userReqDTO);
        String message = "Usuário(a) criado(a) com sucesso! As contas devem ser verificadas. Para verificar sua conta acesso o link: " +
                appURL + ":" + appPORT + appVERIFYEMAILENDPOINT + "?token=" + user.validationToken().toString();
        mailService.sendTextEmail(user.email(),"abertura de conta", message);
        return user;
    }

    public void verifyUser (UUID token) {
        userService.verifyUser(token);
    }

    public void resendVerificationToken (String email) {
        var user = userService.refreshValidationToken(email);
        String message = "Olá! Segue o novo link para verificação da sua conta: " +
                appURL + ":" + appPORT + appVERIFYEMAILENDPOINT + "?token=" + user.getValidationToken().toString();
        mailService.sendTextEmail(user.getEmail(),"abertura de conta", message);
    }








    public void resetPassword (NLNewPasswordReqDTO data) {
        var user = userService.resetPassword(data);
        String message = "Sua senha foi alterada com sucesso!";
        mailService.sendTextEmail(user.getEmail(),"Alteração de senha", message);
    }

    public void forgotPassword (String email) {
        var user = userService.generateNewPasswordToken(email);
        String message = "Olá! Segue o novo link para o cadastro de uma nova senha: " +
                appURL + ":" + appPORT + appNEWPASSWORDENDPOINT + "?token=" + user.getNewPasswordToken().toString() +
                "&email=" + user.getEmail();
        mailService.sendTextEmail(user.getEmail(),"Recuperação de acesso de conta", message);
    }

    public void lResetPassword (LNewPasswordReqDTO data, String accessToken) {
        var user = userService.lResetPassword(data, tokenService.getUserIdFromToken(accessToken));
        String message = "Sua senha foi alterada com sucesso!";
        mailService.sendTextEmail(user.getEmail(),"Alteração de senha", message);
    }



    public void lResetEmail (LNewEmailReqDTO data, String accessToken) {
        var user = userService.lResetEmail(data, tokenService.getUserIdFromToken(accessToken));
        String message = "Seu email foi alterado com sucesso!";
        mailService.sendTextEmail(user.getEmail(),"Alteração de email", message);
    }

    public UserProfileResDTO updateUser (UserDataReqDTO data, String accessToken) {
        var user = userService.updateUser(data, tokenService.getUserIdFromToken(accessToken));
        String message = "Suas informações pessoais foram alteradas com sucesso!";
        mailService.sendTextEmail(user.email(),"Alteração de dados cadastrais", message);
        return user;
    }

}
