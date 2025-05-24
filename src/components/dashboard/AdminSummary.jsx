import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import {
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { fetchDashboard } from "../../ultils/Api/Dashboard";
const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetchDashboard();
        setSummary(res);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="p-6">Loading summary...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>

      {/* Tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaUser />}
          text="Total Employees"
          number={summary.totalEmployee}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartment}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={`$${summary.totalSalary}`}
          color="bg-red-600"
        />
      </div>

      <h3 className="text-2xl font-bold my-6 text-center">Leave Details</h3>

      {/* Chi tiết nghỉ phép */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          icon={<FaFileAlt />}
          text="Leave Applied"
          number={summary.leaveSummary.appliedFor}
          color="bg-cyan-600"
        />
        <SummaryCard
          icon={<FaHourglassHalf />}
          text="Leave Pending"
          number={summary.leaveSummary.pending}
          color="bg-amber-500"
        />
        <SummaryCard
          icon={<FaCheckCircle />}
          text="Leave Approved"
          number={summary.leaveSummary.approved}
          color="bg-green-600"
        />
        <SummaryCard
          icon={<FaTimesCircle />}
          text="Leave Rejected"
          number={summary.leaveSummary.rejected}
          color="bg-rose-600"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
