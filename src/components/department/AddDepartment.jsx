import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment=()=>{
    const navigate=useNavigate();
    const [department,setDepartment]=useState(
        {
            dep_name:'',
            description:'',
        }
    )
    const handleChange=(e)=>{
        const {name,value}=e.target
        setDepartment({...department,[name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const response = await axios.post("http://localhost:8080/api/department/add",department,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
               navigate("/admin-dashboard/department")
            }


        } catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            } 
        }


    }
     return (
        <div className="max-w-xl mt-20 mx-auto p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Department</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department Name
                    </label>
                    <input
                        type="text" 
                        name="dep_name" // thêm name
                        placeholder="Enter department name"
                        value={department.dep_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        
                        placeholder="Enter department code"
                        name="description"
                        value={department.description}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-teal-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
export default AddDepartment;