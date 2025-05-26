import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
const RoleBaseRoutes = ({ children, requireRole }) => {
  const { user, loading } = useAuth();
  console.log(user.role);
  console.log(requireRole);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!requireRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return user ? children : <Navigate to="/login" />;
};
export default RoleBaseRoutes;
