import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostsResponse } from '../models/response/PostsResponse';
import { PostResponse } from '../models/response/PostResponse';
import { INewPost } from '../models/INewPost';
import {IDataToUpdatePost} from '../models/IDataToUpdatePost';
import {IDataToFetchPosts} from '../models/IDataToFetchPosts';

export default class PostService {
    static async fetchPosts(dataToFetchPosts: IDataToFetchPosts): Promise<AxiosResponse<PostsResponse>> {
        return $api.get<PostsResponse>('/posts', {
            params: {
                sort: dataToFetchPosts.sort,
                search: dataToFetchPosts.search,
                limit: dataToFetchPosts.limit,
                page: dataToFetchPosts.page,
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
            user_id: newPost.userId,
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
