import React from "react";
import EmployeeSidebar from "../components/employeedashboard/EmployeeSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
const EmployeeDashboard=()=>{
    return(
        
         <div className="flex h-screen">
            <EmployeeSidebar />
            <div className="flex-1 bg-gray-100 ">
                <Navbar />
                <Outlet />
            </div>

        </div>
    )
}
export default EmployeeDashboard