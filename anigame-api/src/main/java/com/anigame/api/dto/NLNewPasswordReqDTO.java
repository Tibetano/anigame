package com.anigame.api.dto;

public record NLNewPasswordReqDTO(
        String token,
        String email,
        String password
) {
}
