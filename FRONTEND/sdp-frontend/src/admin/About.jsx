import React from "react";
import {
  FaLightbulb,
  FaHandsHelping,
  FaGlobe,
  FaDollarSign,
} from "react-icons/fa";
import "./admincss/about.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Header */}
      <div className="about-header">
        <div className="header-content">
          <h1>Welcome to CrowdFund Hub</h1>
          <p className="subtitle">Empowering Projects Through Community Support</p>
        </div>
      </div>

      <div className="main-content">
        {/* Left - Mission & Values */}
        <div className="left-section">
          <div className="vision-card">
            <FaLightbulb className="vision-icon" />
            <h2>Our Mission</h2>
            <p>
              To help innovative creators and charities reach their goals by
              connecting them with supportive communities and transparent funding.
            </p>
          </div>

          <div className="values-section">
            <h2>Core Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <FaHandsHelping className="value-icon" />
                <h3>Community</h3>
                <p>Fostering collaboration and support among creators and donors.</p>
              </div>
              <div className="value-item">
                <FaDollarSign className="value-icon" />
                <h3>Transparency</h3>
                <p>Ensuring clarity in fund usage and project updates.</p>
              </div>
              <div className="value-item">
                <FaGlobe className="value-icon" />
                <h3>Impact</h3>
                <p>Creating positive social and economic effects worldwide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Categories & Stats */}
        <div className="right-section">
          <div className="features-section">
            <h2>Project Categories</h2>
            <div className="features-grid">
              {["Startup", "Charity", "Sponsorship", "Healthcare"].map((cat) => (
                <div className="feature-card" key={cat}>
                  <FaLightbulb className="feature-icon" />
                  <div className="feature-content">
                    <h3>{cat}</h3>
                    <p>Explore and support projects under {cat} category.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <h3>150+</h3>
              <p>Creators</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Projects Funded</p>
            </div>
            <div className="stat-item">
              <h3>$2M+</h3>
              <p>Funds Raised</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Donors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>We are here to assist creators and donors 24/7</p>
          <div className="contact-info">
            <div className="contact-item">
              <h4>Email Support</h4>
              <p>support@crowdfundhub.com</p>
            </div>
            <div className="contact-item">
              <h4>Helpline</h4>
              <p>+91 1800-123-456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
