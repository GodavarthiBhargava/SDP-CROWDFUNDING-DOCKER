package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Campaign;
import java.util.List;

public interface CampaignService {
    String addCampaign(Campaign campaign);
    List<Campaign> getAllCampaigns();
    Campaign getCampaignById(int id);
    String updateCampaign(Campaign campaign);
    String deleteCampaign(int id);
    List<Campaign> getCampaignsByCreatorId(int creatorId);
}