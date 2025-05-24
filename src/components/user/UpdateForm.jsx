import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetUserById, UpdateUser } from "../../ultils/Api/User";

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await GetUserById(id);
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await UpdateUser(id, formData);
    console.log(success);

    if (success) {
      console.log(success);

      alert("User updated successfully");
      navigate("/admin-dashboard/user");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="w-[70%] mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            className="w-full border p-2 rounded"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
