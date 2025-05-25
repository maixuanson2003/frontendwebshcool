import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GetLeaveListByEmployee } from "../../ultils/Api/Leave";
import Pagination from "../pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const LeaveHistory = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetLeaveListByEmployee(id);
      setLeaves(data || []);
    };
    fetchData();
  }, [id]);

  const filteredLeaves = leaves.filter((leave) => {
    const matchesStatus =
      filterStatus === "All" || leave.status === filterStatus;
    return matchesStatus;
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
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Leave History</h3>
      </div>

      <div className="flex gap-2 mb-4">
        {["All", "Approved", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded border ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setFilterStatus(status);
              setSearchParams({ page: 1 }); // Reset về trang đầu khi đổi trạng thái
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-4">S No</th>
              <th className="py-3 px-4">Leave Type</th>
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">To</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedLeaves.length > 0 ? (
              paginatedLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  <td className="py-3 px-4">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-3 px-4">{leave.leaveType}</td>
                  <td className="py-3 px-4">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{leave.reason}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${statusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No leave records found.
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

export default LeaveHistory;
