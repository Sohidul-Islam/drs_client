import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://dra-server.onrender.com/api",
});

export default axiosInstance;