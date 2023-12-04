import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostsResponse } from '../models/response/PostsResponse';
import { INewPost } from '../models/INewPost';

export default class PostService {
    static async fetchPosts(sort = '', search = ''): Promise<AxiosResponse<PostsResponse>> {
        return $api.get<PostsResponse>('/posts', {
            params: {
                sort: sort,
                search: search,
            }
        });
    }

    static async createPost(newPost: INewPost) {
        return $api.post('/posts', {
            title: newPost.title,
            body: newPost.body,
            userId: newPost.userId,
        });
    }

    static async removePost(postId: number) {
        return $api.delete(`posts/${postId}`);
    }
}
