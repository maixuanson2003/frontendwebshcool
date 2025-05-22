import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments,handleDelete } from "../../ultils/Api/Department";


const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const navigate=useNavigate();

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
    const handleDeleteDepartment = async (id) => {
        try {
            const response = await handleDelete(id);
            if (response) {
                window.location.reload();
                
            }
        } catch (err) {
            console.error("Error fetching departments:", err);
        }

    }

    return (
        <div className="p-6">
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">Manage Departments</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Search by name" className="px-4 py-2 border rounded w-1/2" />
                <Link className="px-4 py-2 bg-teal-600 rounded text-white" to="/admin-dashboard/add-department">
                    Add New Department
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Department Name</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">action</th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {departments.map((dept, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{dept.dep_name}</td>
                                <td className="py-3 px-6">{dept.description}</td>
                                <td className="py-3 px-6 flex gap-x-5 items-center">
                                    <Link to={`/admin-dashboard/edit-department/${dept._id}`} className="bg-red-700 w-[50%] text-center rounded text-white">edit</Link>
                                    <button onClick={()=>{
                                        handleDeleteDepartment(dept._id);
                                    }} className="bg-blue-600 w-[50%] rounded text-white text-center">delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;
