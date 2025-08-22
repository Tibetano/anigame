package com.anigame.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SponsorshipListDTO(
        @JsonProperty("sponsorships")
    List<SponsorshipDTO> sponsorshipList
) {
}
