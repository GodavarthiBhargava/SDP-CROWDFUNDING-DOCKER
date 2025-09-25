import { NavLink, Link, useNavigate, Routes, Route } from "react-router-dom";
import { 
  FaHome, 
  FaSearch, 
  FaHandHoldingUsd, 
  FaFileInvoiceDollar, 
  FaUser, 
  FaSignOutAlt 
} from "react-icons/fa";
import "../admin/admincss/admin.css";
import "./donorcss/DonorSidebar.css";

import { useAuth } from "../contextapi/AuthContext";

// Import donor components
import DonorDashboard from "./DonorDashboard";
import BrowseCampaigns from "./BrowseCampaigns.jsx";
import MyDonations from "./MyDonations";
import TransactionHistory from "./TransactionHistory";
import DonorProfile from "./DonorProfile";
import UpdateProfile from "./UpdateProfile";

export default function DonorNavBar() {
  const navigate = useNavigate();
  const { setIsDonorLoggedIn } = useAuth();

  function handleLogout() {
    sessionStorage.clear();
    setIsDonorLoggedIn(false);  
    navigate("/donor/login", { replace: true });  
  }

  return (
    <div className="app-container">
      {/* 🔹 Top Navbar */}
      <nav className="navbar">
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontSize: "22px", color: "white" }}>
            <strong>HopeRaise Donor</strong>
          </h1>
        </div>

        {/* 🔹 Profile shortcut */}
        <div className="profile-link">
          <ul>
            <li>
              <Link 
                to="/donor/profile" 
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                  width: "30px",
                  height: "30px"
                }}>
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
              <NavLink to="/donor/dashboard"><FaHome /> Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/donor/browse"><FaSearch /> Browse Campaigns</NavLink>
            </li>
            <li>
              <NavLink to="/donor/mydonations"><FaHandHoldingUsd /> My Donations</NavLink>
            </li>
            <li>
              <NavLink to="/donor/transactions"><FaFileInvoiceDollar /> Transaction History</NavLink>
            </li>
            <li>
              <NavLink to="/donor/update"><FaUser /> Update Profile</NavLink>
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
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/donor/browse" element={<BrowseCampaigns />} />
            <Route path="/donor/mydonations" element={<MyDonations />} />
            <Route path="/donor/transactions" element={<TransactionHistory />} />
            <Route path="/donor/profile" element={<DonorProfile />} />
            <Route path="/donor/update" element={<UpdateProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
