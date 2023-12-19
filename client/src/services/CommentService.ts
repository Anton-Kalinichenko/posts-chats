import $api from "../http";
import { AxiosResponse } from 'axios';
import { CommentResponse } from '../models/response/CommentResponse';
import { INewComment } from '../models/INewComment';
import {IDataToUpdateComment} from '../models/IDataToUpdateComment';

export default class CommentService {
    static async fetchComment(commentId: number): Promise<AxiosResponse<CommentResponse>>{
        return $api.get('/comment/' + commentId);
    }

    static async create(newComment: INewComment) {
        return $api.get('/comments/create', {
            params: {
                postId: newComment.postId,
                body: newComment.body,
                userId: newComment.userId,
                parentId: newComment.parentId,
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