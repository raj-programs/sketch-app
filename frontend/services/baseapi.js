import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {

            // Remove expired/invalid token
            localStorage.removeItem("token");

            // Tell the React app to open the login dialog
            window.dispatchEvent(new CustomEvent("auth-expired"));
        }

        return Promise.reject(error);
    }
);

export default api;