package com.klef.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.sdp.backend.model.Creator;
import com.klef.sdp.backend.repository.CreatorRepository;
import java.util.List;

@Service
public class CreatorServiceImpl implements CreatorService {

    @Autowired
    private CreatorRepository creatorRepository;

    @Override
    public String creatorRegistration(Creator creator) {
        if (creatorRepository.existsByUsername(creator.getUsername())) {
            return "Username already exists! Please choose another one.";
        }
        creatorRepository.save(creator);
        return "Creator Registered Successfully";
    }

    @Override
    public Creator checkCreatorLogin(String username, String password) {
        return creatorRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Creator getCreatorById(int id) {
        return creatorRepository.findById(id).orElse(null);
    }

    @Override
    public String updateCreatorProfile(Creator creator) {
        Creator existing = creatorRepository.findById(creator.getId()).orElse(null);
        if (existing != null) {
            existing.setName(creator.getName());
            existing.setEmail(creator.getEmail());
            existing.setUsername(creator.getUsername());
            existing.setPassword(creator.getPassword());
            existing.setMobileno(creator.getMobileno());
            existing.setLocation(creator.getLocation());
            existing.setCategory(creator.getCategory());
            
            creatorRepository.save(existing);
            return "Creator Profile Updated Successfully";
        }
        return "Creator Not Found";
    }

    @Override
    public List<Creator> getAllCreators() {
        return creatorRepository.findAll();
    }
}
