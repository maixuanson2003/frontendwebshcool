import React, { use, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
const AdminDashboard = () => {
    const { user,isAuth} = useAuth();
    const navigate = useNavigate();
    console.log(user);
    
    useEffect(() => {

        let trues=isAuth();
        if( !trues){
            navigate("/login")
        }
    },[])
    


    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 bg-gray-100 ">
                <Navbar />
                <Outlet />
            </div>

        </div>
    )
}
export default AdminDashboard