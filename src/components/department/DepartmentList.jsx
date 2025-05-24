import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchDepartments, handleDelete } from "../../ultils/Api/Department";
import Pagination from "../pagination/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Thêm state cho tìm kiếm
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const ITEMS_PER_PAGE = 5;
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchDepartmentList = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartmentList();
  }, []);

  // 🔍 Lọc danh sách theo tên
  const filteredDepartments = departments.filter((dept) =>
    dept.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);

  // 🔢 Lấy dữ liệu sau khi đã lọc
  const paginatedDepartments = filteredDepartments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      const response = await handleDelete(id);
      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 👈 cập nhật state tìm kiếm
        />
        <Link
          className="px-4 py-2 bg-teal-600 rounded text-white"
          to="/admin-dashboard/add-department"
        >
          Add New Department
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Department Name</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedDepartments.length > 0 ? (
              paginatedDepartments.map((dept, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{dept.dep_name}</td>
                  <td className="py-3 px-6 text-center">{dept.description}</td>
                  <td className="py-3 px-6 flex gap-x-3 justify-center">
                    <Link
                      to={`/admin-dashboard/edit-department/${dept._id}`}
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow transition-all duration-200"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteDepartment(dept._id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition-all duration-200"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DepartmentList;
