import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetEmployeeById } from "../../ultils/Api/Employee";

const EmployeeDetail = () => {
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
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">👤 Employee Details</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                    <img
                        className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500 shadow-md object-cover"
                        src={`http://localhost:8080/${employee?.userId?.profileImage || "default.jpg"}`}
                        alt="Profile"
                    />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">👤 Name</p>
                        <p className="text-lg font-semibold">{employee.userId?.name || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">🆔 Employee ID</p>
                        <p className="text-lg font-semibold">{employee.employeeId || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">🎂 Date of Birth</p>
                        <p className="text-lg font-semibold">
                            {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">🚻 Gender</p>
                        <p className="text-lg font-semibold">{employee.gender || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">🏢 Department</p>
                        <p className="text-lg font-semibold">{employee.department?.dep_name || "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">💍 Marital Status</p>
                        <p className="text-lg font-semibold">{employee.maritalStatus || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
