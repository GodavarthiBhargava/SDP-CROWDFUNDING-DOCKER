package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Campaign;
import com.klef.sdp.backend.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Override
    public String addCampaign(Campaign campaign) {
        campaignRepository.save(campaign);
        return "Campaign Added Successfully";
    }

    @Override
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @Override
    public Campaign getCampaignById(int id) {
        return campaignRepository.findById(id).orElse(null);
    }

    @Override
    public String updateCampaign(Campaign campaign) {
        Optional<Campaign> existing = campaignRepository.findById(campaign.getId());
        if (existing.isPresent()) {
            Campaign c = existing.get();
            c.setTitle(campaign.getTitle());
            c.setDescription(campaign.getDescription());
            c.setCategory(campaign.getCategory());
            c.setGoalAmount(campaign.getGoalAmount());
            c.setCollectedAmount(campaign.getCollectedAmount());
            c.setStartDate(campaign.getStartDate());
            c.setEndDate(campaign.getEndDate());
            c.setStatus(campaign.getStatus());
            c.setImage(campaign.getImage());
            c.setCreator(campaign.getCreator());
            campaignRepository.save(c);
            return "Campaign Updated Successfully";
        }
        return "Campaign Not Found";
    }

    @Override
    public String deleteCampaign(int id) {
        Optional<Campaign> campaign = campaignRepository.findById(id);
        if (campaign.isPresent()) {
            campaignRepository.deleteById(id);
            return "Campaign Deleted Successfully";
        }
        return "Campaign ID Not Found";
    }

    @Override
    public List<Campaign> getCampaignsByCreatorId(int creatorId) {
        return campaignRepository.findByCreator_Id(creatorId);
    }
}