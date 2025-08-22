package com.anigame.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserDataReqDTO(
        @JsonProperty("first_name")
        String firstName,
        @JsonProperty("last_name")
        String lastName,
        @JsonProperty("gender")
        String gender
) {
}
