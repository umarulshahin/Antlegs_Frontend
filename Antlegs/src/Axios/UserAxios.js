import axios from "axios";
import Cookies from 'js-cookie'
import { BaseURL } from "../Utils/Constance";

const UserAxios = axios.create({
    baseURL: BaseURL, // Replace with your actual base URL
    timeout: 10000, // Optional: set a timeout for requests
});

// Step 2: Function to refresh the access token
const refreshToken = async () => {
    try {
    // Get the refresh token from cookies 
    const rawToken = Cookies.get("Usertoken");
    
    if (!rawToken) {
        throw new Error('No token available');
    }

    const token = JSON.parse(rawToken);
    if (!token.refresh) {
        throw new Error('No refresh token available');
    }

    // Request a new access token using the refresh token
    const response = await axios.post(`${BaseURL}token/refresh/`, {

        refresh: token.refresh
    });

    const newToken = response.data;

    // Store the new tokens in cookies
    Cookies.set('Usertoken', JSON.stringify(newToken), { expires: 7 });

    return newToken.access; // Return the new access token
    } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
    }
};

// Step 3: Axios request interceptor
UserAxios.interceptors.request.use(
    (config) => {
    const rawToken = Cookies.get("Usertoken");
    
    if (rawToken) {
        const token = JSON.parse(rawToken);
        config.headers['Authorization'] = `Bearer ${token.access}`;
    }

    return config;
    },
    (error) => Promise.reject(error)
);

// Step 3: Axios response interceptor for handling token refresh
UserAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
    const originalRequest = error.config;
    console.error(error.response,'error')
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return UserAxios(originalRequest);
        } catch (err) {
        return Promise.reject(err);
        }
    }
    return Promise.reject(error);
    }
);

export default UserAxios;