import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';

export const API_URL = 'http://localhost:8000/api/v1'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;

        try {
            // const response = await $api.post<AuthResponse>('/auth/refresh');
            const response = await AuthService.refresh();
            localStorage.setItem('access_token', response.data.data.access_token);

            return $api.request(originalRequest);
        } catch (e) {
            console.error((e as Error).message);
        }
    }

    throw error;
})

export default $api;
