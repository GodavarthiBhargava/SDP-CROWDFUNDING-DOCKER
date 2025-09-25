import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider to manage login states for crowdfunding roles
export function AuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(() => {
    return localStorage.getItem('isCreatorLoggedIn') === 'true';
  });
  const [isDonorLoggedIn, setIsDonorLoggedIn] = useState(() => {
    return localStorage.getItem('isDonorLoggedIn') === 'true';
  });

  // Persist states in localStorage
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isCreatorLoggedIn', isCreatorLoggedIn);
    localStorage.setItem('isDonorLoggedIn', isDonorLoggedIn);
  }, [isAdminLoggedIn, isCreatorLoggedIn, isDonorLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isCreatorLoggedIn,
        setIsCreatorLoggedIn,
        isDonorLoggedIn,
        setIsDonorLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy context access
export const useAuth = () => useContext(AuthContext);
