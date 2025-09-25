package com.klef.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.sdp.backend.model.Creator;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Integer> {
    public Creator findByUsernameAndPassword(String username, String password);
    public boolean existsByUsername(String username);
}
