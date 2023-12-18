export interface INewComment {
    postId: number;
    body: string;
    userId: number;
    parentId: number|null;
}
