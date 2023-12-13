import { IComment } from '../IComment';

export interface PostResponse {
    data: {
        body: string;
        comments: IComment[];
        created_at: string;
        id: number;
        title: string;
        updated_at: string;
        user_id: number;
    };
    message: string;
    success: boolean;
    version: string;
}
