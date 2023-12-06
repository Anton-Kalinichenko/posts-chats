import { IPost } from '../IPost';

export interface PostsResponse {
    data: {
        posts: IPost[];
        post_count: number;
        current_page: number;
        page_count: number;
    };
    message: string;
    success: boolean;
    version: string;
}
