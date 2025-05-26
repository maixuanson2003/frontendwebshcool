import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          401 - Không có quyền truy cập
        </h1>
        <p className="text-gray-600 mb-4">
          Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập hoặc
          liên hệ quản trị viên.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
