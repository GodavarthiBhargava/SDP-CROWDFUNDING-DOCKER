import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaPlusCircle, 
  FaProjectDiagram, 
  FaDonate, 
  FaUser, 
  FaSignOutAlt 
} from "react-icons/fa";
import "../admin/admincss/admin.css";
import "./creatorcss/CreatorSidebar.css";

import CreatorDashboard from "./CreatorDashboard.jsx";
import CreateCampaign from "./CreateCampaigns.jsx";
import MyCampaigns from "./MyCampaigns.jsx";
import DonorList from "./DonorList.jsx";
import CreatorProfile from "./CreatorProfile.jsx";
import NotFound from "../main/NotFound.jsx";
import { useAuth } from "../contextapi/AuthContext.jsx";

export default function CreatorNavBar() {
  const navigate = useNavigate();
  const { setIsCreatorLoggedIn } = useAuth();

  function handleLogout() {
    sessionStorage.clear();
    setIsCreatorLoggedIn(false);
    navigate("/creator/login", { replace: true });
  }

  return (
    <div className="app-container">
      {/* 🔹 Top Navbar */}
      <nav className="navbar">
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontSize: "22px", color: "white" }}>
            <strong>HopeRaise Creator</strong>
          </h1>
        </div>

        {/* 🔹 Profile shortcut */}
        <div className="profile-link">
          <ul>
            <li>
              <Link 
                to="/creator/profile" 
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    width: "30px",
                    height: "30px"
                  }}
                >
                  <FaUser color="black" />
                </div>
                MyProfile
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 Main Layout */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-heading">Menu</h2>
          <ul>
            <li>
              <NavLink to="/creator/dashboard">
                <FaHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/creator/create">
                <FaPlusCircle /> Create Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to="/creator/mycampaigns">
                <FaProjectDiagram /> My Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="/creator/donors">
                <FaDonate /> Donor List
              </NavLink>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "8px 16px"
                }}
              >
                <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <main className="content">
          <Routes>
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/create" element={<CreateCampaign />} />
            <Route path="/creator/mycampaigns" element={<MyCampaigns />} />
            <Route path="/creator/donors" element={<DonorList />} />
            <Route path="/creator/profile" element={<CreatorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
