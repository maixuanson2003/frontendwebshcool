import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetLeaveListByEmployee } from "../../ultils/Api/Leave";





const LeaveHistory = () => {
  const [search, setSearch] = useState("");
  const {id}=useParams();
  const [leaves,setLeaves]=useState([]);

  const filteredLeaves = leaves?.filter((leave) =>
    leave.leaveType.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(()=>{
    const fetchData =async ()=>{
        const data=await GetLeaveListByEmployee(id);
        setLeaves(data)
    }
    fetchData()
  },[])
   const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

 

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Manage Leaves</h2>

      <input
        type="text"
        placeholder="Search By Dep Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-2 border">SNO</th>
              <th className="px-4 py-2 border">Leave Type</th>
              <th className="px-4 py-2 border">From</th>
              <th className="px-4 py-2 border">To</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves?.map((leave, index) => (
              <tr key={leave._id} className="border-t text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{leave.leaveType}</td>
                <td className="px-4 py-2 border">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{leave.reason}</td>
                <td className={`px-4 py-2 border font-semibold ${statusColor(leave.status)}`}>
                  {leave.status}
                </td>
              </tr>
            ))}
            {filteredLeaves?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No leaves found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
