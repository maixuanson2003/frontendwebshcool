import axios from "axios";
export const GetUserList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/list");
    if (response.data.success) {
      return response.data.users;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const GetUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${id}`);
    if (response.data.success) {
      return response.data.users;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const DeleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/user/delete/${id}`
    );
    return response.data.success;
  } catch (err) {
    console.error("Error fetching departments:", err);
  }
};
export const UpdateUser = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/user/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

    return response.data.success;
  } catch (err) {
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
