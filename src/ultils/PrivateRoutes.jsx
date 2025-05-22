import React, { Children } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // 👈 Hoặc spinner đẹp hơn
    }

    return user ? children : <Navigate to="/login" />;

}
export default PrivateRoutes;