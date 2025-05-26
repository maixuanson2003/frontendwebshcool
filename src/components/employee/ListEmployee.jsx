import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { DeleteEmployee, GetEmployeeList } from "../../ultils/Api/Employee";

const ITEMS_PER_PAGE = 5;

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [render, setRender] = useState(0);
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEmployeeList();
      setEmployees(data || []);
    };
    fetchData();
  }, [render]);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phong ban này?"
    );
    if (!confirmDelete) return;

    const response = await DeleteEmployee(id);
    if (response) {
      setRender(render + 1);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const name = emp?.userId?.name?.toLowerCase() || "";
    const empId = emp?._id?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      empId.includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams({ page: 1 });
  };

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID..."
          className="px-4 py-2 border rounded w-1/2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link
          className="px-4 py-2 bg-teal-600 rounded text-white"
          to="/admin-dashboard/add-employee"
        >
          Add New Employee
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">S No</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">DOB</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedEmployees.map((emp, index) => (
              <tr
                key={emp._id}
                className="border-b hover:bg-gray-100 text-center"
              >
                <td className="py-3 px-6">
                  {(page - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6">
                  <img
                    src={`http://localhost:8080/${
                      emp?.userId?.profileImage || "default.jpg"
                    }`}
                    alt="emp"
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="py-3 px-6">{emp?.userId?.name}</td>
                <td className="py-3 px-6">
                  {new Date(emp?.dob).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">{emp?.department?.dep_name}</td>
                <td className="py-3 px-6 space-x-2">
                  <Link
                    to={`/admin-dashboard/employee/${emp._id}`}
                    className="bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin-dashboard/edit-employee/${emp._id}`}
                    className="bg-green-500 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin-dashboard/employee/salary-view/${emp._id}`}
                    className="bg-yellow-400 px-3 py-1 rounded text-white"
                  >
                    Salary
                  </Link>
                  <Link
                    to={`/admin-dashboard/employee/leave/history/${emp._id}`}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Leave
                  </Link>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedEmployees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListEmployee;
