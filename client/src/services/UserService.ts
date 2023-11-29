import $api from "../http";
import { AxiosResponse } from 'axios';
import { UserDataResponse } from '../models/response/UserDataResponse';

export default class UserService {
    static async fetchUser(): Promise<AxiosResponse<UserDataResponse>> {
        return $api.post<UserDataResponse>('/auth/me');
    }
}
