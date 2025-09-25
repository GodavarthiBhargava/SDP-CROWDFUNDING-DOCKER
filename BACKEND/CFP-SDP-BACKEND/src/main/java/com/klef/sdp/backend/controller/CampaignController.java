// src/main/java/com/klef/sdp/backend/controller/CampaignController.java
package com.klef.sdp.backend.controller;

import java.sql.Blob;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klef.sdp.backend.model.Campaign;
import com.klef.sdp.backend.model.Creator;
import com.klef.sdp.backend.repository.CreatorRepository;
import com.klef.sdp.backend.service.CampaignService;

@RestController
@RequestMapping("/campaign")
@CrossOrigin("*")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private CreatorRepository creatorRepository;

    @CrossOrigin(origins = "", allowedHeaders = "", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
    @PostMapping("/add")
    public ResponseEntity<String> addCampaign(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam double goalAmount,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam int creatorId,
            @RequestParam(value = "image", required = false) MultipartFile file
    ) {
        try {
            Creator creator = creatorRepository.findById(creatorId).orElse(null);
            if (creator == null) {
                return ResponseEntity.status(404).body("Creator Not Found");
            }

            Blob blob = null;
            if (file != null && !file.isEmpty()) {
                blob = new SerialBlob(file.getBytes());
            }

            Campaign campaign = new Campaign();
            campaign.setTitle(title);
            campaign.setDescription(description);
            campaign.setCategory(category);
            campaign.setGoalAmount(goalAmount);
            campaign.setCollectedAmount(0);
            campaign.setStartDate(java.time.LocalDate.parse(startDate));
            campaign.setEndDate(java.time.LocalDate.parse(endDate));
            campaign.setStatus("Active");
            campaign.setImage(blob);
            campaign.setCreator(creator);

            String result = campaignService.addCampaign(campaign);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "", allowedHeaders = "", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
    @RequestMapping(value = "/add", method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> preflightAdd() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @GetMapping("/by-creator/{creatorId}")
    public ResponseEntity<List<Campaign>> getByCreator(@PathVariable int creatorId) {
        return ResponseEntity.ok(campaignService.getCampaignsByCreatorId(creatorId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaignById(@PathVariable int id) {
        Campaign campaign = campaignService.getCampaignById(id);
        if (campaign != null) return ResponseEntity.ok(campaign);
        return ResponseEntity.status(404).body("Campaign Not Found");
    }

    @GetMapping(value = "/image/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> displayCampaignImage(@PathVariable int id) {
        try {
            Campaign campaign = campaignService.getCampaignById(id);
            if (campaign != null && campaign.getImage() != null) {
                byte[] imageBytes = campaign.getImage().getBytes(1, (int) campaign.getImage().length());
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(imageBytes);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCampaign(@PathVariable int id) {
        return ResponseEntity.ok(campaignService.deleteCampaign(id));
    }
}