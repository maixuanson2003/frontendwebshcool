import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser } from "react-icons/fa";

const AdminSidebar = () => {
  const navItems = [
    { to: "/admin-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin-dashboard/employee", icon: <FaUser />, label: "Employee" },
    { to: "/admin-dashboard/department", icon: <FaUser />, label: "Department" },
    { to: "/admin-dashboard/leave", icon: <FaUser />, label: "Leave" },
    { to: "/admin-dashboard/addsalary", icon: <FaUser />, label: "Salary" },
    { to: "/setting", icon: <FaUser />, label: "Setting" },
  ];

  return (
    <div className="w-64 h-auto bg-gray-800 text-white shadow-lg p-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-center border-b pb-2">Employee Ms</h3>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="capitalize">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
