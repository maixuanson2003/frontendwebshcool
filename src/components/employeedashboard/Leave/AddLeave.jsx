import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { CreateLeave } from "../../../ultils/Api/Leave";
import { useNavigate } from "react-router-dom";


const AddLeave = () => {
  const { user } = useAuth();
  const navigate=useNavigate();
  const [leave, setLeave] = useState({
    userId:user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    console.log("Leave submitted:", leave);
    const data=await CreateLeave(leave);
    if(data){
        navigate("/employee-dashboard/leave")
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Request for Leave</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Leave Type</label>
          <select
            name="leaveType"
            value={leave.leaveType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          >
            <option value="" disabled>Select cause</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-5">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label className="block text-sm font-medium text-gray-600 mb-2">From Date</label>
            <input
              type="date"
              name="startDate"
              value={leave.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-600 mb-2">To Date</label>
            <input
              type="date"
              name="endDate"
              value={leave.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <textarea
            name="reason"
            rows="3"
            value={leave.reason}
            onChange={handleChange}
            placeholder="Reason"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none resize-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 text-white text-center bg-teal-600 rounded hover:bg-teal-700 transition font-medium"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
