import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { GetLeaveListByEmployee } from "../../../ultils/Api/Leave";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const LeaveList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetLeaveListByEmployee(user._id);
      setLeaveData(data || []);
    };
    fetchData();
  }, [user._id]);

  const filteredLeaves = leaveData.filter((leave) => {
    return filterStatus === "All" || leave.status === filterStatus;
  });

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const paginatedData = filteredLeaves.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-[90%] mx-auto p-6  h-fit">
      <h1 className="text-2xl font-bold text-center my-6">Manage Leaves</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["All", "Approved", "Pending", "Rejected"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded border text-sm ${
                filterStatus === status
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setFilterStatus(status);
                setSearchParams({ page: 1 });
              }}
            >
              {status}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => navigate("/employee-dashboard/addleave")}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded font-medium"
          >
            Add Leave
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-xs">
              <th className="py-3 px-4 font-semibold">SNO</th>
              <th className="py-3 px-4 font-semibold">LEAVE TYPE</th>
              <th className="py-3 px-4 font-semibold">FROM</th>
              <th className="py-3 px-4 font-semibold">TO</th>
              <th className="py-3 px-4 font-semibold">DESCRIPTION</th>
              <th className="py-3 px-4 font-semibold">APPLIED DATE</th>
              <th className="py-3 px-4 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((leave, index) => (
                <tr key={leave._id || index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {leave.leaveType}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(leave.startDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(leave.endDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {leave.reason}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(leave.appliedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {leave.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default LeaveList;
