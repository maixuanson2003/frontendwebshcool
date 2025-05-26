import React, { useEffect, useState } from "react";
import { GetEmployeeByDepId } from "../../ultils/Api/Employee";
import { fetchDepartments } from "../../ultils/Api/Department";
import { CreateDataSalary } from "../../ultils/Api/Salary";
import { GetEmployeeById } from "../../ultils/Api/Employee";

const AddSalary = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [departmentForm, setDepartmentForm] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataDepartment = await fetchDepartments();
      setDepartments(dataDepartment);
    };
    fetchData();
  }, []);

  const handleChangeDepartment = async (e) => {
    const departmentId = e.target.value;
    setDepartmentForm(departmentId);

    setFormData((prev) => ({
      ...prev,
      employeeId: "",
      basicSalary: 0,
    }));

    if (departmentId) {
      const data = await GetEmployeeByDepId(departmentId);
      setEmployees(data);
    } else {
      setEmployees([]);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      const data = await GetEmployeeById(value);
      setFormData((prev) => ({
        ...prev,
        employeeId: value,
        basicSalary: data.salary || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = await CreateDataSalary(formData);
    if (data) {
      alert("add salary success");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Salary</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select
              value={departmentForm}
              onChange={handleChangeDepartment}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Department</option>
              {departments?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.dep_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Employee</label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Employee</option>
              {employees?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.employeeId || "Unnamed"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              placeholder="Insert Salary"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              placeholder="Monthly Allowances"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              placeholder="Monthly Deductions"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
