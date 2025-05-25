import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { GetLeaveDetail, UpdateLeaveStatus } from "../../ultils/Api/Leave"; // <-- Đảm bảo có hàm này

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetLeaveDetail(id);
      setLeave(data);
    };
    fetchData();
  }, [id]);

  const handleAction = async (status) => {
    setLoading(true);
    const result = await UpdateLeaveStatus(id, status);
    if (result) {
      setLeave((prev) => ({ ...prev, status })); // cập nhật trạng thái mới vào state
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">Leave Details</h2>

      <div className="flex flex-row gap-6">
        <div className="relative">
          <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden z-10 relative">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:8080/${
                leave?.employeeId?.userId?.profileImage || "default.jpg"
              }`}
              alt="Employee"
            />
          </div>
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-blue-400 via-purple-300 to-blue-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10" />
        </div>

        {/* Info Section */}
        <div className="w-full ml-20">
          <InfoRow label="Name" value={leave?.employeeId?.userId?.name} />
          <InfoRow label="Employee ID" value={leave?.employeeId?.employeeId} />
          <InfoRow label="LeaveType" value={leave?.leaveType} />
          <InfoRow label="Reason" value={leave?.reason} />
          <InfoRow
            label="Department"
            value={leave?.employeeId?.department?.dep_name}
          />
          <InfoRow
            label="Start Date"
            value={new Date(leave?.startDate).toLocaleDateString()}
          />
          <InfoRow
            label="End Date"
            value={new Date(leave?.endDate).toLocaleDateString()}
          />
          <InfoRow label="Status" value={leave?.status || "Pending"} />

          {leave?.status === "Pending" && (
            <div className="flex justify-start gap-4 mt-4">
              <button
                onClick={() => handleAction("Approved")}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Approving..." : "Approve"}
              </button>
              <button
                onClick={() => handleAction("Rejected")}
                disabled={loading}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Rejecting..." : "Reject"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex py-1">
    <div className="w-1/3 font-medium">{label}:</div>
    <div className="w-2/3">{value || "-"} </div>
  </div>
);

export default LeaveDetails;
