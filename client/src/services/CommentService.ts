import $api from "../http";
import { INewComment } from '../models/INewComment';

export default class CommentService {
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
}