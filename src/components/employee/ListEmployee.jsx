import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { GetEmployeeList } from "../../ultils/Api/Employee";

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetEmployeeList();
            setEmployees(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search By Employee ID"
                    className="px-4 py-2 border rounded w-1/2"
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
                        {employees?.map((emp, index) => (
                            <tr key={emp._id} className="border-b hover:bg-gray-100 text-center">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">
                                    <img
                                        src={`http://localhost:8080/${emp?.userId?.profileImage || "default.jpg"}`}
                                        alt="emp"
                                        className="w-10 h-10 rounded-full mx-auto"
                                    />
                                </td>
                                <td className="py-3 px-6">{emp?.userId?.name}</td>
                                <td className="py-3 px-6">{new Date(emp?.dob).toLocaleDateString()}</td>
                                <td className="py-3 px-6">{emp?.department?.dep_name}</td>
                                <td className="py-3 px-6 space-x-2">
                                    <Link to={`/admin-dashboard/employee/${emp._id}`} className="bg-blue-500 px-3 py-1 rounded text-white">View</Link>
                                    <Link to={`/admin-dashboard/edit-employee/${emp._id}`} className="bg-green-500 px-3 py-1 rounded text-white">Edit</Link>
                                    <Link to={`/admin-dashboard/salary-view/${emp._id}`} className="bg-yellow-400 px-3 py-1 rounded text-white">Salary</Link>
                                    <Link to={`/admin-dashboard/leave/history/${emp._id}`} className="bg-red-500 px-3 py-1 rounded text-white">Leave</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployee;
