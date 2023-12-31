import { IPost } from '../IPost';

export interface PostsResponse {
    data: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        data: IPost[];
    };
    message: string;
    success: boolean;
    version: string;
}
