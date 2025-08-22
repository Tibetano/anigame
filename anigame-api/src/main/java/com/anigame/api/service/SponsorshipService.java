package com.anigame.api.service;

import com.anigame.api.dto.SponsorshipListDTO;
import com.anigame.api.persistence.repository.CustomSponsorshipRepository;
import org.springframework.stereotype.Service;

@Service
public class SponsorshipService {

    private final CustomSponsorshipRepository customSponsorshipRepository;

    public SponsorshipService(CustomSponsorshipRepository customSponsorshipRepository) {
        this.customSponsorshipRepository = customSponsorshipRepository;
    }

    public SponsorshipListDTO findAllByVersion () {
        return customSponsorshipRepository.findAllSponsorshipByVersion();
    }

}
