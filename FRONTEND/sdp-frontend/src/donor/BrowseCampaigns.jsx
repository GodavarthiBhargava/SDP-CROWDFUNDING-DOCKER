import React, { useEffect, useState } from "react";
import axios from "axios";
import "./donorcss/BrowseCampaigns.css";
import placeholderImg from "../assets/main.png";

export default function BrowseCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/campaign`;

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);

      // Only active campaigns for donors
      const activeCampaigns = response.data
        .filter((c) => c.status === "Active")
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

      // Merge stored donations for display
      const merged = activeCampaigns.map((c) => {
        const extra = getStoredDonationsFor(c.id);
        return { ...c, collectedAmount: (c.collectedAmount || 0) + extra };
      });

      setCampaigns(merged);
      setError("");
    } catch (err) {
      setError("Failed to fetch campaigns: " + err.message);
    }
  };

  const getStoredDonations = () => {
    try {
      const raw = localStorage.getItem("donations");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const getStoredDonationsFor = (campaignId) => {
    const map = getStoredDonations();
    return Number(map[campaignId] || 0);
  };

  const setStoredDonationFor = (campaignId, amount) => {
    const map = getStoredDonations();
    const prev = Number(map[campaignId] || 0);
    map[campaignId] = prev + amount;
    localStorage.setItem("donations", JSON.stringify(map));
  };

  // One-time migration from sessionStorage -> localStorage if needed
  useEffect(() => {
    try {
      const sessionRaw = sessionStorage.getItem("donations");
      if (sessionRaw && !localStorage.getItem("donations")) {
        localStorage.setItem("donations", sessionRaw);
      }
    } catch {}
  }, []);

  const handleDonate = (campaign) => {
    const currentRaised = Number(campaign.collectedAmount || 0);
    const goal = Number(campaign.goalAmount || 0);
    const remaining = Math.max(0, goal - currentRaised);
    if (remaining <= 0) {
      alert("This campaign is already fully funded.");
      return;
    }

    const input = prompt(`Enter amount to donate (max ₹${remaining}):`, "");
    if (!input) return;
    const value = Number(input);
    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (value > remaining) {
      alert(`Amount exceeds remaining goal (₹${remaining}).`);
      return;
    }

    // Persist and update UI state
    setStoredDonationFor(campaign.id, value);
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaign.id
          ? { ...c, collectedAmount: Number(c.collectedAmount || 0) + value }
          : c
      )
    );
    alert("Thank you for your donation!");
  };

  return (
    <div className="browsecampaigns-container">
      <h2>Browse Campaigns</h2>
      {error && <p className="error-message">{error}</p>}

      {campaigns.length === 0 ? (
        <p>No active campaigns available.</p>
      ) : (
        <div className="cards-grid">
          {campaigns.map((c) => {
            const pct = Math.min(
              100,
              Math.floor(((c.collectedAmount || 0) / (c.goalAmount || 1)) * 100)
            );
            return (
              <div className="card" key={c.id}>
                <div className="card-image-wrap">
                  <img
                    className="card-image"
                    src={`${API_URL}/image/${c.id}`}
                    alt={c.title}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg;
                    }}
                  />
                  <div className="card-badges">
                    <span className="badge">{c.category}</span>
                    <span className="badge status">{c.status}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{c.title}</h3>
                  <p className="card-desc">
                    {(c.description || "").slice(0, 140)}
                    {(c.description || "").length > 140 ? "…" : ""}
                  </p>
                  <div className="price-row">
                    <div className="goal">Goal: ₹{c.goalAmount}</div>
                    <div className="raised">Raised: ₹{c.collectedAmount}</div>
                  </div>
                  <div className="progress-row">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="progress-text">{pct}%</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    className="donate-btn"
                    onClick={() => handleDonate(c)}
                  >
                    Donate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
