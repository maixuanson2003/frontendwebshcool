import React from "react";
import SummaryCard from "../dashboard/SummaryCard";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
const EmployeeSummary=()=>{
    const {user}=useAuth();
    return(
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dasboard overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={<FaUser/>} text="welcome back" number={user.name}/>
            </div>
        </div>
    )
}
export default EmployeeSummary