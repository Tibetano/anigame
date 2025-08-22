package com.anigame.api.persistence.entity;

import com.anigame.api.persistence.entity.enumerate.SponsorshipType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "tb_sponsorships")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SponsorshipEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sponsorship_id", columnDefinition = "uuid DEFAULT gen_random_uuid()", updatable = false, nullable = false)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, name = "site_link")
    private String siteLink;
    @Column(nullable = false, name = "logo_link")
    private String logoLink;
    @Column(name = "sponsorship_value", nullable = false)
    private BigDecimal value;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SponsorshipType type;
    @Column(unique = true, nullable = false)
    private String cnpj;
}
