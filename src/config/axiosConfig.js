import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://dra-server.onrender.com/api',
});

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('accessToken');
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Get the token from cookies
        const token = getToken();
        if (token) {
            // Add the token to the headers
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;







// import axios from "axios";
// const axiosInstance = axios.create({
//     baseURL: "https://dra-server.onrender.com/api",
// });

// export default axiosInstance;