package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Donor;
import java.util.List;

public interface DonorService {
    String donorRegistration(Donor donor);
    Donor checkDonorLogin(String username, String password);
    Donor getDonorById(int id);
    String updateDonorProfile(Donor donor);
    List<Donor> getAllDonors();
}
