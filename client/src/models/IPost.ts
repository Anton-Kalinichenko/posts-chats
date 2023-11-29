import { IUser } from './IUser';

export interface IPost {
    id: number;
    user: IUser;
    title: string;
    body: string;
    created_at: string;
}
