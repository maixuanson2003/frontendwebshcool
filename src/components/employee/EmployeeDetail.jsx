import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetEmployeeById, UpdateImage } from "../../ultils/Api/Employee";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const data = await GetEmployeeById(id);
    setEmployee(data);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    const response = await UpdateImage(formData, id);
    if (response) {
      await fetchData();
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        👤 Employee Details
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar và nút cập nhật */}
        <div className="flex flex-col flex-shrink-0 items-center">
          <img
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500 shadow-md object-cover"
            src={
              selectedImage ||
              `http://localhost:8080/${
                employee?.userId?.profileImage || "default.jpg"
              }`
            }
            alt="Profile"
          />

          <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Update Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Thông tin chi tiết */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard label="👤 Name" value={employee.userId?.name} />
          <InfoCard label="🆔 Employee ID" value={employee.employeeId} />
          <InfoCard
            label="🎂 Date of Birth"
            value={
              employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"
            }
          />
          <InfoCard label="🚻 Gender" value={employee.gender} />
          <InfoCard
            label="🏢 Department"
            value={employee.department?.dep_name}
          />
          <InfoCard label="💍 Marital Status" value={employee.maritalStatus} />
        </div>
      </div>
    </div>
  );
};

// Component con để hiển thị từng trường
const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value || "N/A"}</p>
  </div>
);

export default EmployeeDetail;
