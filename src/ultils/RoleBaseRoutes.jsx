import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
const RoleBaseRoutes = ({ children, requireRole }) => {
    const { user, loading } = useAuth();
    console.log(user);
    

    if (loading) {
        return <div>Loading...</div>; // 👈 Hoặc spinner đẹp hơn
    }
    if (!requireRole.includes(user.role)) {
        <Navigate to="/unauthorized" />
    }
    return user ? children : <Navigate to="/login" />
}
export default RoleBaseRoutes;