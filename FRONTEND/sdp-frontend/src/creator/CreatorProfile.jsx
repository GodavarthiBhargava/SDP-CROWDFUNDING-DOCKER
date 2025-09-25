import { useState, useEffect } from "react";
import "./creatorcss/CreatorProfile.css";

export default function CreatorProfile() {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem("creator");
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  if (!creator) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading profile...
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const validCategories = ["Startup", "Charity", "Sponsorship", "Healthcare"];
  const category = validCategories.includes(creator.category) ? creator.category : "Startup";

  return (
    <div className="creator-profile-container">
      {/* Header */}
      <div className="creator-profile-header">
        {creator.image ? (
          <img
            src={creator.image}
            alt="Creator"
            className="creator-profile-image"
          />
        ) : (
          <div className="creator-avatar">{getInitials(creator.name)}</div>
        )}

        <div className="creator-header-info">
          <h2 className="creator-name">{creator.name}</h2>
          <p className="creator-role">{creator.role || "Creator"}</p>
          <p className="creator-bio">{creator.bio || "Passionate content creator."}</p>
        </div>
      </div>

      {/* Profile Info Grid */}
      <div className="creator-profile-details">
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{creator.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username</span>
          <span className="detail-value">{creator.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{creator.mobileno}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location</span>
          <span className="detail-value">{creator.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Category</span>
          <span className="detail-value">{category}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Experience</span>
          <span className="detail-value">{creator.experience || 0} years</span>
        </div>
      </div>
    </div>
  );
}
