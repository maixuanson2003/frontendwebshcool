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
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Emp ID"
          className="px-4 py-2 border rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {["Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setFilterStatus(filterStatus === status ? "" : status)
              }
              className={`px-4 py-2 rounded ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-center">S No</th>
              <th className="py-3 px-4 text-center">Emp ID</th>
              <th className="py-3 px-4 text-center">Name</th>
              <th className="py-3 px-4 text-center">Leave Type</th>
              <th className="py-3 px-4 text-center">Department</th>
              <th className="py-3 px-4 text-center">Days</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedLeaves.length > 0 ? (
              paginatedLeaves.map((leave, index) => (
                <tr
                  key={leave._id || index}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4 text-center">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {leave?.employeeId?.employeeId || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {leave?.employeeId?.userId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {leave?.leaveType || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {leave?.employeeId?.department?.dep_name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {leave?.appliedAt || "N/A"}
                  </td>
                  <td
                    className={`py-3 px-4 text-center ${statusColor(
                      leave?.status
                    )}`}
                  >
                    {leave?.status || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/leave/${leave._id}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManageLeaves;
