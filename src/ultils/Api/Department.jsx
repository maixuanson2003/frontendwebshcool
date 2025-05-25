import axios from "axios";
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/department/getlist"
    );
    if (response.data.success) {
      return response.data.departments;
    }
  } catch (err) {
    console.error("Error fetching departments:", err);
  }
};
export const handleDelete = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/department/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.success;
  } catch (err) {
    console.log(err);
    if (err.response) {
      const status = err.response.status;

      if (status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert(err.response.data.error || "Có lỗi xảy ra");
      }
    }
  }
};
