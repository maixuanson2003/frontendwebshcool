import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../ultils/Api/Department";
import { GetEmployeeById,UpdateEmployee } from "../../ultils/Api/Employee";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditEmployeeForm = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    maritalStatus: "Single",
    designation: "",
    salary: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee details
        const employeeData = await GetEmployeeById(id);
        setFormData({
          name: employeeData.userId?.name || "",
          maritalStatus: employeeData.maritalStatus || "Single",
          designation: employeeData.designation || "",
          salary: employeeData.salary || "",
          department: employeeData.department?._id || "",
        });

        // Fetch department list
        const departmentList = await fetchDepartments();
        setDepartments(departmentList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data=await UpdateEmployee(formData,id);
    if(data){
        navigate("/admin-dashboard/employee");

    }

  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">✏️ Edit Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block mb-1 font-medium text-gray-700">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block mb-1 font-medium text-gray-700">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Department */}
        <div className="md:col-span-2">
          <label htmlFor="department" className="block mb-1 font-medium text-gray-700">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">-- Select Department --</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
