package com.anigame.api.dto;

public record LNewPasswordReqDTO(
        String newPassword,
        String currentPassword
) {
}
