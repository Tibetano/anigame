package com.anigame.api.persistence.repository;

import com.anigame.api.dto.SponsorshipDTO;
import com.anigame.api.dto.SponsorshipListDTO;
import com.anigame.api.persistence.entity.enumerate.SponsorshipType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomSponsorshipRepository {
    @PersistenceContext
    EntityManager entityManager;

    public SponsorshipListDTO findAllSponsorshipByVersion(){
        List<SponsorshipDTO> sponsorshipListTemp = new ArrayList<>();
        String sql = """
                SELECT ts.name, ts.logo_link, ts.site_link, ts."type"\s
                FROM tb_events te, tb_sponsorships ts\s
                WHERE ts.event_id = te.event_id AND te.season = (SELECT MAX(te.season) FROM tb_events te);""";
        List<Object[]> DBSponsorshipList = entityManager.createNativeQuery(sql).getResultList();

        sponsorshipListTemp = DBSponsorshipList.stream().map(line -> {
            return new SponsorshipDTO(
                (String)line[0],
                (String)line[1] ,
                (String)line[2] ,
                SponsorshipType.valueOf((String)line[3])
            );
        }).toList();

        return new SponsorshipListDTO(sponsorshipListTemp);
    }

}
