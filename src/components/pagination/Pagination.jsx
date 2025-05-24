// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded ${
            i + 1 === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
