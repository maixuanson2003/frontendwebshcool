import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
const EmployeeSidebar = () => {
  const {user}=useAuth();

  const navItems = [
    { to: "/employee-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: `/employee-dashboard/employee/${user._id}`, icon: <FaUser />, label: "My profile" },
    { to: "/employee-dashboard/salary", icon: <FaUser />, label: "salary" },
    { to: "/employee-dashboard/leave", icon: <FaUser />, label: "Leave" },
    { to: "/employee-dashboard/setting", icon: <FaUser />, label: "Setting" },
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

export default EmployeeSidebar;
