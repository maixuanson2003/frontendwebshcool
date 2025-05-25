import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { GetSalaryByEmployeeId } from "../../../ultils/Api/Salary";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../pagination/Pagination"; // Đảm bảo đúng đường dẫn

const ITEMS_PER_PAGE = 5;

const SalaryHistory = () => {
  const { user } = useAuth();
  const [salaryData, setSalaryData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetSalaryByEmployeeId(user._id);
      setSalaryData(data || []);
    };
    fetchData();
  }, [user._id]);

  const filteredSalary = salaryData.filter((item) =>
    item.employeeId?.employeeId
      ?.toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredSalary.length / ITEMS_PER_PAGE);
  const paginatedData = filteredSalary.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6  h-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Salary History</h1>
      </div>

      <div className="  rounded shadow-sm overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-200  text-sm text-gray-600 text-left">
              <th className="py-2 px-4">SNO</th>
              <th className="py-2 px-4">EMP ID</th>
              <th className="py-2 px-4">SALARY</th>
              <th className="py-2 px-4">ALLOWANCE</th>
              <th className="py-2 px-4">DEDUCTION</th>
              <th className="py-2 px-4">TOTAL</th>
              <th className="py-2 px-4">PAY DATE</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((record, index) => (
                <tr
                  key={record._id || index}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="py-3 px-4">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-3 px-4">
                    {record.employeeId?.employeeId || "N/A"}
                  </td>
                  <td className="py-3 px-4">{record.basicSalary}</td>
                  <td className="py-3 px-4">{record.allowances}</td>
                  <td className="py-3 px-4">{record.deductions}</td>
                  <td className="py-3 px-4">{record.netSalary}</td>
                  <td className="py-3 px-4">
                    {new Date(record.payDate).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No salary records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SalaryHistory;
