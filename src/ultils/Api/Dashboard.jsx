import axios from "axios";
export const fetchDashboard = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/dashboard/summary",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    if (response.data.success) {
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      console.log(status);

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
