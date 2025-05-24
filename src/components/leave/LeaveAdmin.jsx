import React, { useEffect, useState } from "react";
import { GetLeaveList } from "../../ultils/Api/Leave";
import { useNavigate, useSearchParams } from "react-router-dom";

import Pagination from "../pagination/Pagination";
const ITEMS_PER_PAGE = 5;

const ManageLeaves = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [leave, setLeave] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetLeaveList();
      const cleaned = data?.filter((item) => item.employeeId !== null);
      setLeave(cleaned);
    };
    fetchData();
  }, []);

  const filteredLeaves = leave?.filter((leave) => {
    return (
      leave?.employeeId?.employeeId
        ?.toLowerCase()
        .includes(search.toLowerCase()) &&
      (filterStatus === "" || leave.status === filterStatus)
    );
  });

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const paginatedLeaves = filteredLeaves.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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
    <div className="w-full mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Manage Leaves</h2>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {["Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilterStatus(filterStatus === status ? "" : status)
            }
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search By Emp ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
            {paginatedLeaves.map((leave, index) => (
              <tr key={leave._id || index} className="text-center">
                <td className="border p-2">
                  {(page - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="border p-2">
                  {leave?.employeeId?.employeeId || "N/A"}
                </td>
                <td className="border p-2">
                  {leave?.employeeId?.userId?.name || "N/A"}
                </td>
                <td className="border p-2">{leave?.leaveType || "N/A"}</td>
                <td className="border p-2">
                  {leave?.employeeId?.department?.dep_name || "N/A"}
                </td>
                <td className="border p-2">{leave?.appliedAt || "N/A"}</td>
                <td className={`border p-2 ${statusColor(leave?.status)}`}>
                  {leave?.status || "N/A"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() =>
                      navigate(`/admin-dashboard/leave/${leave._id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedLeaves.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ManageLeaves;
