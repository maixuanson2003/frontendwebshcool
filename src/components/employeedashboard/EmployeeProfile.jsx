import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetEmployeeById } from "../../ultils/Api/Employee";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEmployeeById(id);
      setEmployee(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto h-[400px] mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">My Profiles</h2>

      <div className="flex flex-row items-center">
        {/* Profile Image with colorful background */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 border-4 border-blue-600  rounded-full overflow-hidden bg-blue-200 z-10 relative">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:8080/${
                employee?.userId?.profileImage || "default.jpg"
              }`}
              alt="Employee"
            />
          </div>
          {/* Colorful background effect */}
          <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 via-purple-200 to-blue-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </div>

        {/* Details Section */}
        <div className="w-full">
          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">Name:</div>
            <div className="w-1/2">{employee.userId?.name}</div>
          </div>

          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">
              Employee ID:
            </div>
            <div className="w-1/2">{employee.employeeId}</div>
          </div>

          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">
              Date of Birth:
            </div>
            <div className="w-1/2">
              {new Date(employee.dob).toLocaleDateString("en-GB")}
            </div>
          </div>

          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">Gender:</div>
            <div className="w-1/2">{employee.gender}</div>
          </div>

          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">Department:</div>
            <div className="w-1/2">{employee.department?.dep_name}</div>
          </div>

          <div className="flex py-2">
            <div className="w-1/2 font-medium text-right pr-6">
              Marital Status:
            </div>
            <div className="w-1/2">{employee.maritalStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
