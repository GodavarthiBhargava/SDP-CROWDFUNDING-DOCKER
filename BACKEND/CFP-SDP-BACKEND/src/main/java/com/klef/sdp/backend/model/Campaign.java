// src/main/java/com/klef/sdp/backend/model/Campaign.java
package com.klef.sdp.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table(name = "campaign_table")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private int id;

    @Column(name = "title", length = 150, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "category", length = 50, nullable = false)
    private String category;

    @Column(name = "goal_amount", nullable = false)
    private double goalAmount;

    @Column(name = "collected_amount", nullable = false)
    private double collectedAmount = 0;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "status", length = 20, nullable = false)
    private String status = "Active";

    @Lob
    @Column(name = "image")
    @JsonIgnore
    private Blob image;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "campaigns"})
    private Creator creator;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public double getGoalAmount() { return goalAmount; }
    public void setGoalAmount(double goalAmount) { this.goalAmount = goalAmount; }
    public double getCollectedAmount() { return collectedAmount; }
    public void setCollectedAmount(double collectedAmount) { this.collectedAmount = collectedAmount; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Blob getImage() { return image; }
    public void setImage(Blob image) { this.image = image; }
    public Creator getCreator() { return creator; }
    public void setCreator(Creator creator) { this.creator = creator; }
}