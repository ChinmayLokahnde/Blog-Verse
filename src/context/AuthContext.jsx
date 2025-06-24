import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("🧠 AuthContext restoring user:", storedUser); 
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?._id) {
          setUser(parsed);
        }
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
  console.log("Logged in user:", userData);
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user?.token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
