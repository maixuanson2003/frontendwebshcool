
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { GetSalaryByEmployeeId } from "../../../ultils/Api/Salary";

const SalaryHistory = () => {
  const {user}=useAuth();
  const [salaryData,setSalaryData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
        const data=await GetSalaryByEmployeeId(user._id);
        setSalaryData(data)
    }
    fetchData();
  },[])

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center mx-auto">Salary History</h1>
      </div>
      
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="px-4 py-1 border border-gray-300 rounded focus:outline-none w-56"
        />
      </div>
      
      <div className="bg-white rounded shadow-sm">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">SNO</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">EMP ID</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">SALARY</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">ALLOWANCE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">DEDUCTION</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">TOTAL</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600 text-left">PAY DATE</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((record,index) => (
              <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-500">{index+1}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{record.employeeId.employeeId}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{record.basicSalary}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{record.allowances}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{record.deductions}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{record.netSalary}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{new Date(record.payDate).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryHistory;