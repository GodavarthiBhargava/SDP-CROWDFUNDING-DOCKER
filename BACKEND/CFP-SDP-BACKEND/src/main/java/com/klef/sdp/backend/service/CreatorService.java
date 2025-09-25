package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Creator;
import java.util.List;

public interface CreatorService {
    public String creatorRegistration(Creator creator);
    public Creator checkCreatorLogin(String username, String password);
    public Creator getCreatorById(int id);
    public String updateCreatorProfile(Creator creator);
    public List<Creator> getAllCreators();
}
