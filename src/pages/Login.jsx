import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const {login}=useAuth();
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email, password
            });
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token",response.data.token);
                if(response.data.user.role==="admin"){
                    navigate("/admin-dashboard");

                }else{
                    navigate("/employee-dashboard");
                }
            }


        } catch (err) {
            if (err.response && !err.response.data.success) {
                setError(err.response.data.error);
            } else {
                setError("Server error");
            }
        }


    }
    return (
        <div className="h-screen flex items-center justify-center bg-teal-600">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-semibold mb-6 text-teal-800">
                    Employee Management System
                </h2>
                {error && (
                    <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
                )}                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold mb-4">Login</h3>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
