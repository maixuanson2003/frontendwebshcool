import React, { useEffect, useState } from "react";
import { GetLeaveList } from "../../ultils/Api/Leave";
import { useNavigate } from "react-router-dom";

const initialLeaves = [
  { id: 1, empId: "yousaf222", name: "yousaf", type: "Sick Leave", department: "Logistic", days: 4, status: "Approved" },
  { id: 2, empId: "yousaf222", name: "yousaf", type: "Casual Leave", department: "Logistic", days: 1, status: "Approved" },
  { id: 3, empId: "asif113", name: "asif", type: "Sick Leave", department: "Database", days: 1, status: "Rejected" },
  { id: 4, empId: "asif113", name: "asif", type: "Annual Leave", department: "Database", days: 2, status: "Rejected" },
  { id: 5, empId: "asif113", name: "asif", type: "Casual Leave", department: "Database", days: 2, status: "Pending" },
];

const ManageLeaves = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [leave,setLeave]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchData =async ()=>{
        const data=await GetLeaveList();
        setLeave(data);
    }
    fetchData();
  },[])

  const filteredLeaves = leave.filter((leave) => {
    return (
      leave.employeeId.employeeId.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "" || leave.status === filterStatus)
    );
  });

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-700";
      case "Rejected":
        return "text-red-700";
      case "Pending":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Manage Leaves</h2>

      <div className="flex gap-2 mb-4">
        {["Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
            className={`px-4 py-1 rounded ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search By Emp ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">S No</th>
              <th className="border p-2">Emp ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Leave Type</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves?.map((leave, index) => (
              <tr key={leave.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{leave.employeeId.employeeId}</td>
                <td className="border p-2">{leave.employeeId.userId.name}</td>
                <td className="border p-2">{leave.leaveType}</td>
                <td className="border p-2">{leave.employeeId.department.dep_name}</td>
                <td className="border p-2">{leave.appliedAt}</td>
                <td className={`border p-2 ${statusColor(leave.status)}`}>
                  {leave.status}
                </td>
                <td className="border p-2">
                  <button onClick={
                    ()=>{
                        navigate(`/admin-dashboard/leave/${leave._id}`)
                    }
                  } className="bg-blue-500 text-white px-3 py-1 rounded text-xs">View</button>
                </td>
              </tr>
            ))}
            {filteredLeaves.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLeaves;
