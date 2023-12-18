import { IComment } from '../IComment';

export interface CommentsResponse {
    data: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        data: IComment[];
    };
    message: string;
    success: boolean;
    version: string;
}
