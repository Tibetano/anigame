package com.anigame.api.controller;

import com.anigame.api.service.SponsorshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sponsorships")
public class SponsorshipController {

    private final SponsorshipService sponsorshipService;

    public SponsorshipController(SponsorshipService sponsorshipService) {
        this.sponsorshipService = sponsorshipService;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getAllSponsors() {
        return ResponseEntity.ok(sponsorshipService.findAllByVersion());
    }
}
