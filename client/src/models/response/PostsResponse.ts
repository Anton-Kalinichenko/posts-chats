import { IPost } from '../IPost';

export interface PostsResponse {
    data: IPost[];
    message: string;
    success: boolean;
    version: string;
}
