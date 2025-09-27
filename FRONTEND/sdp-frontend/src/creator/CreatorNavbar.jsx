import { useState } from "react";
import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import { FiUser, FiLogOut, FiMenu, FiX, FiHome, FiPlus, FiFolder, FiUsers } from "react-icons/fi";

// Import Creator components
import CreatorDashboard from "./CreatorDashboard";
import CreateCampaigns from "./CreateCampaigns";
import MyCampaigns from "./MyCampaigns";
import DonorList from "./DonorList";
import CreatorProfile from "./CreatorProfile";
import NotFound from "../main/NotFound";

// Styles
import "./creatorcss/CreatorNavbar.css";

export default function CreatorNavBar() {
  const navigate = useNavigate();
  const { setIsCreatorLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    sessionStorage.clear();
    setIsCreatorLoggedIn(false);
    navigate("/creator/login", { replace: true });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="creator-app-container">
      {/* Horizontal Navbar */}
      <nav className="creator-navbar">
        <div className="creator-logo">
          <span className="creator-logo-icon">🎯</span>
          <span className="creator-logo-text">HopeRaise Creator</span>
        </div>

        <button className="creator-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`creator-nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/creator/dashboard" onClick={() => setIsMenuOpen(false)}>
              <FiHome className="nav-icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/creator/create" onClick={() => setIsMenuOpen(false)}>
              <FiPlus className="nav-icon" />
              Create Campaign
            </NavLink>
          </li>
          <li>
            <NavLink to="/creator/mycampaigns" onClick={() => setIsMenuOpen(false)}>
              <FiFolder className="nav-icon" />
              My Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink to="/creator/donors" onClick={() => setIsMenuOpen(false)}>
              <FiUsers className="nav-icon" />
              Donor List
            </NavLink>
          </li>
          <li>
            <NavLink to="/creator/profile" onClick={() => setIsMenuOpen(false)}>
              <FiUser className="nav-icon" />
              Profile
            </NavLink>
          </li>
          <li className="creator-user-section">
            <div className="creator-user-info">
              <FiUser className="creator-user-icon" />
              <span>Creator</span>
            </div>
            <button className="creator-logout-btn" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="creator-main-content">
        <Routes>
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/create" element={<CreateCampaigns />} />
          <Route path="/creator/mycampaigns" element={<MyCampaigns />} />
          <Route path="/creator/donors" element={<DonorList />} />
          <Route path="/creator/profile" element={<CreatorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}