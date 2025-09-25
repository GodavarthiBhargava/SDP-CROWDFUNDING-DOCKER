package com.klef.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.sdp.backend.model.Donor;
import com.klef.sdp.backend.repository.DonorRepository;
import java.util.List;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Override
    public String donorRegistration(Donor donor) {
        if (donorRepository.existsByUsername(donor.getUsername())) {
            return "Username already exists! Please choose another one.";
        }
        if (donorRepository.existsByEmail(donor.getEmail())) {
            return "Email already exists! Please use a different email.";
        }
        if (donorRepository.existsByMobileno(donor.getMobileno())) {
            return "Mobile number already exists! Please use a different one.";
        }

        donorRepository.save(donor);
        return "Donor Registered Successfully";
    }

    @Override
    public Donor checkDonorLogin(String username, String password) {
        return donorRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Donor getDonorById(int id) {
        return donorRepository.findById(id).orElse(null);
    }

    @Override
    public String updateDonorProfile(Donor donor) {
        Donor existing = donorRepository.findById(donor.getId()).orElse(null);
        if (existing != null) {
            existing.setName(donor.getName());
            existing.setEmail(donor.getEmail());
            existing.setUsername(donor.getUsername());
            existing.setPassword(donor.getPassword());
            existing.setMobileno(donor.getMobileno());
            existing.setLocation(donor.getLocation());
            existing.setDob(donor.getDob());
            existing.setGender(donor.getGender());
            existing.setRole(donor.getRole());

            donorRepository.save(existing);
            return "Donor Profile Updated Successfully";
        }
        return "Donor Not Found";
    }

    @Override
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
