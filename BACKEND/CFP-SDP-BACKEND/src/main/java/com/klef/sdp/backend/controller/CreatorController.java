package com.klef.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klef.sdp.backend.model.Creator;
import com.klef.sdp.backend.service.CreatorService;

import java.util.List;

@RestController
@RequestMapping("/creator")
@CrossOrigin("*")
public class CreatorController {

    @Autowired
    private CreatorService creatorService;

    // 1️⃣ Creator Registration
    @PostMapping("/registration")
    public ResponseEntity<String> creatorRegistration(@RequestBody Creator creator) {
        return ResponseEntity.ok(creatorService.creatorRegistration(creator));
    }

    // 2️⃣ Check Creator Login
    @PostMapping("/checklogin")
    public ResponseEntity<?> checkCreatorLogin(@RequestBody Creator creator) {
        Creator c = creatorService.checkCreatorLogin(creator.getUsername(), creator.getPassword());
        if (c != null) {
            return ResponseEntity.ok(c); // return full creator info including ID
        } else {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    // 3️⃣ Get Creator Profile by ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getCreatorProfile(@PathVariable int id) {
        Creator c = creatorService.getCreatorById(id);
        if (c != null) {
            return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.status(404).body("Creator Not Found");
        }
    }

    // 4️⃣ Update Creator Profile
    @PutMapping("/updateprofile")
    public ResponseEntity<String> updateCreatorProfile(@RequestBody Creator creator) {
        return ResponseEntity.ok(creatorService.updateCreatorProfile(creator));
    }

    // 5️⃣ Get All Creators
    @GetMapping("/all")
    public ResponseEntity<List<Creator>> getAllCreators() {
        return ResponseEntity.ok(creatorService.getAllCreators());
    }

    // 6️⃣ Get Current Creator by ID (for frontend to fetch logged-in creator)
    @GetMapping("/current/{id}")
    public ResponseEntity<?> getCurrentCreator(@PathVariable int id) {
        Creator c = creatorService.getCreatorById(id);
        if (c != null) {
            return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.status(404).body("Creator Not Found. Please log in.");
        }
    }
}
