 
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

// NavBars
import MainNavBar from "./main/MainNavBar";
import CreatorNavBar from './creator/CreatorNavbar';
import AdminNavBar from './admin/AdminNavBar';
import DonorNavBar from './donor/DonorNavbar';

function AppContent() {
  const { isAdminLoggedIn, isCreatorLoggedIn, isDonorLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {isAdminLoggedIn ? (
        <AdminNavBar/>
      ) : isCreatorLoggedIn ? (
        <CreatorNavBar/>
      ) : isDonorLoggedIn ? (
        <DonorNavBar/>
      ) : (
        <MainNavBar/>
      )}
      {/* Add your Routes here */}
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
