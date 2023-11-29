import { IUser } from '../IUser';

export interface UserDataResponse {
    data: IUser;
    message: string;
    success: boolean;
    version: string;
}
