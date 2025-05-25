import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navItems = [
    {
      to: "/admin-dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      end: true,
    },
    {
      to: "/admin-dashboard/employee",
      icon: <FaUsers />,
      label: "Employee",
    },
    {
      to: "/admin-dashboard/user",
      icon: <FaUserShield />,
      label: "User",
    },
    {
      to: "/admin-dashboard/department",
      icon: <FaBuilding />,
      label: "Department",
    },
    {
      to: "/admin-dashboard/leave",
      icon: <FaCalendarAlt />,
      label: "Leave",
    },
    {
      to: "/admin-dashboard/addsalary",
      icon: <FaMoneyCheckAlt />,
      label: "Salary",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl p-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-wide">
          <span className="text-teal-400">Admin</span> Panel
        </h2>
        <p className="text-gray-400 text-sm mt-1">Control Center</p>
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 group
               ${
                 isActive
                   ? "bg-teal-600 shadow-md font-semibold"
                   : "hover:bg-gray-700"
               }`
            }
          >
            {item.icon}
            <span className="capitalize tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
