import React, { useEffect, useState } from "react";
import axios from "axios";
import "./creatorcss/MyCampaigns.css";
import placeholderImg from "../assets/main.png";

export default function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/campaign`;

  useEffect(() => {
    fetchMyCampaigns();
  }, []);

  const fetchMyCampaigns = async () => {
    try {
      const storedCreator = localStorage.getItem("creator");
      const creatorId = storedCreator ? JSON.parse(storedCreator).id : null;
      if (!creatorId) {
        setError("Creator not logged in.");
        setCampaigns([]);
        return;
      }

      const response = await axios.get(`${API_URL}/by-creator/${creatorId}`);
      // Merge stored donations (from donor side) for local display parity
      const map = (() => {
        try {
          return JSON.parse(localStorage.getItem("donations") || "{}");
        } catch {
          return {};
        }
      })();
      const merged = (response.data || []).map((c) => ({
        ...c,
        collectedAmount:
          Number(c.collectedAmount || 0) + Number(map[c.id] || 0),
      }));
      setCampaigns(merged);
      setError("");
    } catch (err) {
      setError("Failed to fetch campaigns: " + err.message);
    }
  };

  return (
    <div className="mycampaigns-container">
      <h2>My Campaigns</h2>
      {error && <p className="error-message">{error}</p>}

      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="campaign-table-wrap">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title & Description</th>
                <th>Category</th>
                <th>Goal</th>
                <th>Raised</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const pct = Math.min(
                  100,
                  Math.floor(((c.collectedAmount || 0) / (c.goalAmount || 1)) * 100)
                );
                return (
                  <tr key={c.id}>
                    <td>
                      <img
                        className="table-image"
                        src={`${API_URL}/image/${c.id}`}
                        alt={c.title}
                        onError={(e) => {
                          e.currentTarget.src = placeholderImg;
                        }}
                      />
                    </td>
                    <td>
                      <div className="table-title">{c.title}</div>
                      <div className="table-desc">
                        {(c.description || "").slice(0, 130)}
                        {(c.description || "").length > 130 ? "…" : ""}
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
                    </td>
                    <td>
                      <span className="badge">{c.category}</span>
                    </td>
                    <td>₹{c.goalAmount}</td>
                    <td className="collected">₹{c.collectedAmount}</td>
                    <td>
                      <span
                        className={`badge status ${(c.status || "").toLowerCase()}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.startDate}</td>
                    <td>{c.endDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
