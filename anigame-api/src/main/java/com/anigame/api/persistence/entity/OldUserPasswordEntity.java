package com.anigame.api.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_old_user_password")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OldUserPasswordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "password_id", columnDefinition = "uuid DEFAULT gen_random_uuid()", updatable = false, nullable = false)
    private UUID id;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Instant replacedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
