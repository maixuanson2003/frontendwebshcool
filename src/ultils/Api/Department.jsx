import axios from "axios";
export const fetchDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/department/getlist");
        if (response.data.success) {
            return response.data.departments;
        }
    } catch (err) {
        console.error("Error fetching departments:", err);
    }
};
export const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/department/delete/${id}`);
        return response.data.success
    } catch (err) {
        console.error("Error fetching departments:", err);
    }

}
