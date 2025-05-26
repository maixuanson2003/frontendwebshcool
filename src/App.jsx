import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./ultils/PrivateRoutes";
import RoleBaseRoutes from "./ultils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import ListEmployee from "./components/employee/ListEmployee";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeDetail from "./components/employee/EmployeeDetail";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import SalaryView from "./components/salary/SalaryView";
import EmployeeSummary from "./components/employeedashboard/EmployeeSummary";
import EmployeeProfile from "./components/employeedashboard/EmployeeProfile";
import LeaveList from "./components/leave/employee/LeaveList";
import AddLeave from "./components/leave/employee/AddLeave";
import SalaryHistory from "./components/salary/Employee/SalaryHistory";
import LeaveManagementInterface from "./components/leave/LeaveAdmin";
import ManageLeaves from "./components/leave/LeaveAdmin";
import LeaveDetails from "./components/leave/LeaveDetails";
import LeaveHistory from "./components/leave/LeaveHistory";
import UserList from "./components/user/UserList";
import UpdateForm from "./components/user/UpdateForm";
import Unauthorized from "./pages/Unauthorized";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          <Route
            path="/admin-dashboard/department"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/edit-department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/employee"
            element={<ListEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/:id"
            element={<EmployeeDetail />}
          ></Route>
          <Route
            path="/admin-dashboard/edit-employee/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/addsalary"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/salary-view/:id"
            element={<SalaryView />}
          ></Route>
          <Route
            path="/admin-dashboard/leave"
            element={<ManageLeaves />}
          ></Route>
          <Route
            path="/admin-dashboard/leave/:id"
            element={<LeaveDetails />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/leave/history/:id"
            element={<LeaveHistory />}
          ></Route>
          <Route path="/admin-dashboard/user" element={<UserList />}></Route>
          <Route
            path="/admin-dashboard/updateuser/:id"
            element={<UpdateForm />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />}></Route>
          <Route
            path="/employee-dashboard/employee/:id"
            element={<EmployeeProfile />}
          ></Route>
          <Route
            path="/employee-dashboard/leave"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/addleave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary"
            element={<SalaryHistory />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
