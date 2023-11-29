import { IUser } from '../IUser';

export interface AuthResponse {
    data: {
        access_token: string;
        token_type: string;
        expires_in: number;
        user: IUser;
    };
    message: string;
    success: boolean;
    version: string;
}
