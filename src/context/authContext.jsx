import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState, createContext } from "react";
const userContext = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");

      try {
        if (token) {
          const response = await axios.get(
            `http://localhost:8080/api/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  const isAuth = () => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  };

  return (
    <userContext.Provider value={{ user, login, logout, isAuth, loading }}>
      {children}
    </userContext.Provider>
  );
};
export const useAuth = () => useContext(userContext);
export default AuthContext;
