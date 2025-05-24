import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteUser, GetUserList } from "../../ultils/Api/User";
import Pagination from "../pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [render, setRender] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetUserList();
      setUsers(res);
    };
    fetchUsers();
  }, [render]);

  // Lọc user theo tên hoặc email
  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const success = await DeleteUser(id);
      if (success) {
        setRender(render + 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset trang về 1 khi search
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Cắt dữ liệu theo trang
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      {/* Input tìm kiếm */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="px-4 py-2 border rounded mb-4 w-1/2"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Updated At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">
                {user.profileImage ? (
                  <img
                    src={`http://localhost:8080/${user.profileImage}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                {new Date(user.createAt).toLocaleDateString()}
              </td>
              <td className="p-2">
                {new Date(user.updateAt).toLocaleDateString()}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() =>
                    navigate(`/admin-dashboard/updateuser/${user._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {paginatedUsers.length === 0 && (
            <tr>
              <td className="p-4 text-center" colSpan="7">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
