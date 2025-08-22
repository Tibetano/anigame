package com.anigame.api.dto;

import com.anigame.api.persistence.entity.enumerate.UserGender;
import com.anigame.api.persistence.entity.enumerate.UserStatus;
import lombok.Builder;

import java.time.Instant;
import java.time.LocalDate;

@Builder
public record UserProfileResDTO(
        String username,
        String firstName,
        String lastName,
        String cpf,
        String email,
        UserGender gender,
        LocalDate dateOfBirth,
        UserStatus status,
        Instant createdAt
) {
}
