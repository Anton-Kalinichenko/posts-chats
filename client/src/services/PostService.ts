import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostsResponse } from '../models/response/PostsResponse';
import { INewPost } from '../models/INewPost';

export default class PostService {
    static async fetchPosts(sort = '', search = '', limit: number = 1, page: number = 1): Promise<AxiosResponse<PostsResponse>> {
        return $api.get<PostsResponse>('/posts', {
            params: {
                sort: sort,
                search: search,
                limit: limit,
                page: page,
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
        return $api.delete(`/posts/${postId}`);
    }
}
