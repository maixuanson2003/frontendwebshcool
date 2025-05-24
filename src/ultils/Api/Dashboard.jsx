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
    console.error("Error fetching departments:", err);
  }
};
