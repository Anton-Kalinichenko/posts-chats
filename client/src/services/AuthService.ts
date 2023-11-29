import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password});
    }

    static async registration(name: string, email: string, password: string, password_confirmation: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/register', {name, email, password, password_confirmation});
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout').then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('access_token');
            }
        });
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/refresh');
    }

    static async sendEmailConfirmationNotification(): Promise<void> {
        return $api.get('/auth/send-email-confirmation-notification');
    }
}
