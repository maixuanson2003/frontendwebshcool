import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GetSalaryByEmployeeId } from "../../ultils/Api/Salary";
import Pagination from "../pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const SalaryView = () => {
  const { id } = useParams();
  const [salaries, setSalaries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchSalary = async () => {
      const data = await GetSalaryByEmployeeId(id);
      setSalaries(data || []);
    };
    fetchSalary();
  }, [id]);

  const totalPages = Math.ceil(salaries.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const paginatedSalaries = salaries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Salary History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-center">S No</th>
              <th className="py-3 px-4 text-center">Emp ID</th>
              <th className="py-3 px-4 text-center">Salary</th>
              <th className="py-3 px-4 text-center">Allowance</th>
              <th className="py-3 px-4 text-center">Deduction</th>
              <th className="py-3 px-4 text-center">Total</th>
              <th className="py-3 px-4 text-center">Pay Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedSalaries.length > 0 ? (
              paginatedSalaries.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  <td className="py-3 px-4">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-3 px-4">
                    {item?.employeeId?.employeeId || "N/A"}
                  </td>
                  <td className="py-3 px-4">{item?.basicSalary || "N/A"}</td>
                  <td className="py-3 px-4">{item?.allowances || "N/A"}</td>
                  <td className="py-3 px-4">{item?.deductions || "N/A"}</td>
                  <td className="py-3 px-4">{item?.netSalary || "N/A"}</td>
                  <td className="py-3 px-4">
                    {item?.payDate
                      ? new Date(item.payDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
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

export default SalaryView;
