import { IComment } from '../IComment';
import { IUser } from '../IUser';

export interface PostResponse {
    data: {
        id: number;
        user: IUser;
        title: string;
        body: string;
        comments: IComment[];
        created_at: string;
        updated_at: string;
    };
    message: string;
    success: boolean;
    version: string;
}
