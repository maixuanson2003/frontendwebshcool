import axios from "axios";
export const CreateLeave = async (formdata) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/leave/add",
      formdata,
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
export const GetLeaveListByEmployee = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/leave/employee/${id}`
    );
    if (response.data.success) {
      return response.data.leaves;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const GetLeaveList = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/leave/list`);
    if (response.data.success) {
      return response.data.leaves;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const GetLeaveDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/leave/${id}`);
    if (response.data.success) {
      return response.data.leaves;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const UpdateLeaveStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/leave/update/${id}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
