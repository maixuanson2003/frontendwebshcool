import axios from "axios";
export const CreateLeave = async (formdata) => {
    try {
        const response = await axios.post("http://localhost:8080/api/leave/add", formdata, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.success;


    } catch (err) {
        console.log(err);

        if (err.response && !err.response.data.success) {
            alert(err.response.data.error);
        }
    }
}
export const GetLeaveListByEmployee=async(id)=>{
     try {
        const response = await axios.get(`http://localhost:8080/api/leave/employee/${id}`)
        if (response.data.success) {
            return response.data.leaves;
        }
    } catch (err) {
        console.log(err);

        if (err.response && !err.response.data.success) {
            alert(err.response.data.error);
        }
    }
}