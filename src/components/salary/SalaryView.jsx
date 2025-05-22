import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSalaryByEmployeeId } from "../../ultils/Api/Salary";

const SalaryView = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();

    const fetchSalary = async () => {
        const data = await GetSalaryByEmployeeId(id);
        setSalaries(data);
        setFilteredSalaries(data);
    };

    useEffect(() => {
        fetchSalary();
    }, []);

    const filteredSalarie = (e) => {
        const q = e.target.value;
        const filteredRecord = salaries.filter((salary) =>
            salary.employeeId.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecord);
    };

    return (
        <div>
            {filteredSalaries == null ? (
                <div>Loading....</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Emp ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={filteredSalarie}
                        />
                    </div>
                    {filteredSalaries.length > 0 ? (
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">SNO</th>
                                    <th className="border px-4 py-2">EMP ID</th>
                                    <th className="border px-4 py-2">SALARY</th>
                                    <th className="border px-4 py-2">ALLOWANCE</th>
                                    <th className="border px-4 py-2">DEDUCTION</th>
                                    <th className="border px-4 py-2">TOTAL</th>
                                    <th className="border px-4 py-2">PAY DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{item.employeeId.employeeId}</td>
                                        <td className="border px-4 py-2">{item.basicSalary}</td>
                                        <td className="border px-4 py-2">{item.allowances}</td>
                                        <td className="border px-4 py-2">{item.deductions}</td>
                                        <td className="border px-4 py-2">{item.netSalary}</td>
                                        <td className="border px-4 py-2">{item.payDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-500">No records found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalaryView;
