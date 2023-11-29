import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostsResponse } from '../models/response/PostsResponse';

export default class PostService {
    static async fetchPosts(): Promise<AxiosResponse<PostsResponse>> {
        return $api.get<PostsResponse>('/posts');
    }
}
