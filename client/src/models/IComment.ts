import { IUser } from './IUser';

export interface IComment {
    id: number;
    post_id: number;
    body: string;
    user: IUser;
    parent_id: number;
    created_at: string;
    updated_at: string;
}
