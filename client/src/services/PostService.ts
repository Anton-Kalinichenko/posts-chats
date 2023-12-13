import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostsResponse } from '../models/response/PostsResponse';
import { PostResponse } from '../models/response/PostResponse';
import { INewPost } from '../models/INewPost';
import {IDataToUpdatePost} from '../models/IDataToUpdatePost';

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

    static async fetchPost(postId: number): Promise<AxiosResponse<PostResponse>>{
        return $api.get('/post/' + postId);
    }

    static async create(newPost: INewPost) {
        return $api.post('/posts', {
            title: newPost.title,
            body: newPost.body,
            userId: newPost.userId,
        });
    }

    static async update(dataToUpdatePost: IDataToUpdatePost) {
        return $api.put(`/posts/${dataToUpdatePost.postId}`, {
            title: dataToUpdatePost.title,
            body: dataToUpdatePost.body,
        });
    }

    static async remove(postId: number) {
        return $api.delete(`/posts/${postId}`);
    }
}
