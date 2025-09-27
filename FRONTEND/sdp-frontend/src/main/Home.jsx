import { FaBullhorn, FaHandHoldingHeart, FaChartLine, FaUsers, FaRocket, FaShieldAlt, FaGlobe, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image from "../assets/crowdfunding-hero.png";
import "./css/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to HopeRaise</h1>
            <p className="hero-description">
              Connect with causes that matter. HopeRaise empowers creators to launch meaningful campaigns 
              and enables donors to make a real impact with complete transparency and trust.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/donor/login")}>
                <FaHeart style={{ marginRight: '8px' }} />
                Start Donating
              </button>
              <button className="secondary-btn" onClick={() => navigate("/creator/login")}>
                <FaRocket style={{ marginRight: '8px' }} />
                Launch Campaign
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={image} alt="Crowdfunding Platform" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose HopeRaise?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaBullhorn className="feature-icon" />
            <h3>Launch Campaigns</h3>
            <p>Creators can start fundraising campaigns with ease, complete with goal tracking and progress visualization.</p>
          </div>
          <div className="feature-card">
            <FaHandHoldingHeart className="feature-icon" />
            <h3>Secure Donations</h3>
            <p>Donors contribute safely with transparent tracking, real-time updates, and complete financial transparency.</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Track Progress</h3>
            <p>Monitor campaign goals and contributions in real-time with beautiful analytics and progress indicators.</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community Impact</h3>
            <p>Share success stories, foster trust among users, and build a community of changemakers.</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Trust & Security</h3>
            <p>Advanced security measures ensure your data and donations are protected with bank-level encryption.</p>
          </div>
          <div className="feature-card">
            <FaGlobe className="feature-icon" />
            <h3>Global Reach</h3>
            <p>Connect with causes worldwide and make an impact across borders with our international platform.</p>
          </div>
        </div>
      </section>
    </div>
  );
}