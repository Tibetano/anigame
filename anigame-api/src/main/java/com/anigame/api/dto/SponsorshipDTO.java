package com.anigame.api.dto;

import com.anigame.api.persistence.entity.enumerate.SponsorshipType;
import com.fasterxml.jackson.annotation.JsonProperty;

public record SponsorshipDTO(
        String name,
        @JsonProperty("logo_link")
        String logoLink,
        @JsonProperty("site_link")
        String siteLink,
        SponsorshipType type
) {
}
