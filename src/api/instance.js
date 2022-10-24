import axios from "axios";
import {authApi} from "./authApi";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://dummy-api.d0.acom.cloud/api',
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    return config
})

instance.interceptors.response.use(function (response) {
    return response;
},  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest._isRetry) {
        originalRequest._isRetry = false
        try {
            const response = await authApi.refreshToken()
            localStorage.setItem('access_token', response.access_token)
            return instance.request(originalRequest)
        } catch (error) {
            console.log('error', error)
        }
    }
    throw error
});