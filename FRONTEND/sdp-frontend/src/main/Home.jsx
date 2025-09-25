import { FaUserMd, FaCalendarAlt, FaFileInvoiceDollar, FaHospital } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image from "../assets/crowdfunding-hero.png";
import "./css/Home.css";

import { FaBullhorn, FaHandHoldingHeart, FaChartLine, FaUsers } from "react-icons/fa";
import "./css/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content row">
          <div className="hero-text col">
            <h1>Welcome to FundsConnect </h1>
            <p className="hero-description">
              FundConnect lets creators launch campaigns for causes they care about, and donors support initiatives with transparency and ease.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/donor/login")}>
                Login as Donor
              </button>
              <button className="secondary-btn" onClick={() => navigate("/creator/login")}>
                Login as Creator
              </button>
            </div>
          </div>
          <div className="hero-image col">
            <img src={image} alt="Crowdfunding" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why FundConnect?</h2>
        <div className="features-grid row">
          <div className="feature-card col">
            <FaBullhorn className="feature-icon" />
            <h3>Launch Campaigns</h3>
            <p>Creators can start fundraising campaigns with ease.</p>
          </div>
          <div className="feature-card col">
            <FaHandHoldingHeart className="feature-icon" />
            <h3>Secure Donations</h3>
            <p>Donors contribute safely with transparent tracking.</p>
          </div>
          <div className="feature-card col">
            <FaChartLine className="feature-icon" />
            <h3>Track Progress</h3>
            <p>Monitor campaign goals and contributions in real-time.</p>
          </div>
          <div className="feature-card col">
            <FaUsers className="feature-icon" />
            <h3>Community Impact</h3>
            <p>Share success stories and foster trust among users.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
