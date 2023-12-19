import { IComment } from '../IComment';

export interface CommentResponse {
    data: IComment[];
    message: string;
    success: boolean;
    version: string;
}
