import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import "./admincss/admin.css";
import "./admincss/AdminSidebar.css";
import { useAuth } from "../contextapi/AuthContext";

// Import Admin components
import AdminDashboard from "./AdminDashboard";
import ManageCampaigns from "./ManageCampaigns";
import ManageDonors from "./ManageDonors";
import ManageCreators from "./ManageCreators";
import FundTracking from "./FundTracking";
import ReportsAndAnalytics from "./ReportsAndAnalytics";
import AddCreator from "./AddCreator";

export default function AdminNavBar() {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  function handleLogout() {
    sessionStorage.clear();
    setIsAdminLoggedIn(false);
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="app-container admin-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1 style={{ color: "white" }}>HopeRaise Admin</h1>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar admin-sidebar">
          <h2 className="sidebar-heading">Menu</h2>
          <ul>
            <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/manage-campaigns">Manage Campaigns</NavLink></li>
            <li><NavLink to="/admin/manage-donors">Manage Donors</NavLink></li>
            <li><NavLink to="/admin/manage-creators">Manage Creators</NavLink></li>
            <li><NavLink to="/admin/add-creator">Add Creator</NavLink></li>
            <li><NavLink to="/admin/funds">Fund Tracking</NavLink></li>
            <li><NavLink to="/admin/reports">Reports & Analytics</NavLink></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </aside>

        {/* Routed Pages */}
        <main className="content">
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-campaigns" element={<ManageCampaigns />} />
            <Route path="/admin/manage-donors" element={<ManageDonors />} />
            <Route path="/admin/manage-creators" element={<ManageCreators />} />
            <Route path="/admin/add-creator" element={<AddCreator />} />
            <Route path="/admin/funds" element={<FundTracking />} />
            <Route path="/admin/reports" element={<ReportsAndAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
