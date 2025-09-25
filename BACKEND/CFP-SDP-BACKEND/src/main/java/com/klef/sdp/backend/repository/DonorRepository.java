package com.klef.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.sdp.backend.model.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Integer> {
    Donor findByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByMobileno(String mobileno);
 
}
