import axios from "axios";
export const CreateDataEmployee = async (formdata) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/employee/add",
      formdata,
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
export const GetEmployeeList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/employee/getlist"
    );
    if (response.data.success) {
      return response.data.employees;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const GetEmployeeById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/employee/${id}`
    );
    if (response.data.success) {
      return response.data.employees;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const GetEmployeeByDepId = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/employee/department/${id}`
    );
    if (response.data.success) {
      return response.data.employees;
    }
  } catch (err) {
    console.log(err);

    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
};
export const UpdateEmployee = async (formdata, id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/employee/update/${id}`,
      formdata,
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
