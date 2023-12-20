import $api from "../http";
import { AxiosResponse } from 'axios';
import { CommentsResponse } from '../models/response/CommentsResponse';
import { CommentResponse } from '../models/response/CommentResponse';
import { INewComment } from '../models/INewComment';
import {IDataToFetchComments} from '../models/IDataToFetchComments';
import {IDataToUpdateComment} from '../models/IDataToUpdateComment';

export default class CommentService {
    static async fetchComments(dataToFetchComments: IDataToFetchComments): Promise<AxiosResponse<CommentsResponse>> {
        return $api.get<CommentsResponse>('/comments', {
            params: {
                post_id: dataToFetchComments.postId,
                parent_id: dataToFetchComments.parentId,
                limit: dataToFetchComments.limit,
                page: dataToFetchComments.page,
            }
        });
    }

    static async fetchComment(commentId: number): Promise<AxiosResponse<CommentResponse>>{
        return $api.get('/comment/' + commentId);
    }

    static async create(newComment: INewComment) {
        return $api.get('/comments/create', {
            params: {
                post_id: newComment.postId,
                body: newComment.body,
                user_id: newComment.userId,
                parent_id: newComment.parentId,
            },
        });
    }

    static async update(dataToUpdateComment: IDataToUpdateComment) {
        return $api.put(`/comments/${dataToUpdateComment.commentId}`, {
            body: dataToUpdateComment.body,
        });
    }

    static async remove(commentId: number) {
        return $api.delete(`/comment/${commentId}`);
    }
}