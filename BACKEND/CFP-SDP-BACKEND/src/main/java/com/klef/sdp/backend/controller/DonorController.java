package com.klef.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.klef.sdp.backend.model.Donor;
import com.klef.sdp.backend.service.DonorService;

import java.util.List;

@RestController
@RequestMapping("/donor")
@CrossOrigin("*")
public class DonorController {

    @Autowired
    private DonorService donorService;

    // ---------------- Registration ----------------
    @PostMapping("/registration")
    public ResponseEntity<String> donorRegistration(@RequestBody Donor donor) {
        String result = donorService.donorRegistration(donor);

        if (result.contains("already exists")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result); // 400 error
        }

        return ResponseEntity.ok(result); // 200 success
    }

    // ---------------- Login ----------------
    @PostMapping("/checklogin")
    public ResponseEntity<?> checkDonorLogin(@RequestBody Donor donor) {
        Donor d = donorService.checkDonorLogin(donor.getUsername(), donor.getPassword());
        if (d != null) {
            return ResponseEntity.ok(d);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password");
        }
    }

    // ---------------- Profile ----------------
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getDonorProfile(@PathVariable int id) {
        Donor d = donorService.getDonorById(id);
        if (d != null) {
            return ResponseEntity.ok(d);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor Not Found");
        }
    }

    // ---------------- Update ----------------
    @PutMapping("/updateprofile")
    public ResponseEntity<String> updateDonorProfile(@RequestBody Donor donor) {
        String result = donorService.updateDonorProfile(donor);

        if (result.equals("Donor Not Found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }

        return ResponseEntity.ok(result);
    }

    // ---------------- All Donors ----------------
    @GetMapping("/all")
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }
}
