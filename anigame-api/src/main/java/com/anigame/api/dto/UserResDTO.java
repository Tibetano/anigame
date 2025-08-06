package com.anigame.api.dto;

import com.anigame.api.persistence.entity.enumerate.UserGender;
import com.anigame.api.persistence.entity.enumerate.UserStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record UserResDTO(
        UUID id,
        String username,
        String firstName,
        String lastName,
        String cpf,
        String email,
        UserGender gender,
        LocalDate dateOfBirth,
        UserStatus status,
        UUID validationToken,
        Instant createdAt
) {
}
