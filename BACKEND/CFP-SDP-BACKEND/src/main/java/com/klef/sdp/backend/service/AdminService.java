package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Admin;
import com.klef.sdp.backend.model.Campaign;
import com.klef.sdp.backend.model.Creator;
import com.klef.sdp.backend.model.Donor;

import java.util.List;

public interface AdminService {

    // --- Admin ---
    public Admin checkAdminLogin(String username, String password);

    // --- Creator ---
    public String addCreator(Creator creator);
    public List<Creator> displayCreators();
    public String deleteCreator(int id);
    public long displayCreatorCount();

    // --- Donor ---
    public List<Donor> displayDonors();
    public long displayDonorCount();

    // --- Campaign ---
    public String addCampaign(Campaign campaign);
    public List<Campaign> displayCampaigns();
    public String deleteCampaign(int id);
    public long displayCampaignCount();
}
