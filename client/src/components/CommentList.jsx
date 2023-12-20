import React, {useState, useEffect} from 'react';
import CommentItem from './CommentItem';
import CommentService from '../services/CommentService';

const CommentList = (props) => {
    const [comments, setComments] = useState([]);
    const commentsLimit = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);

    const fetchComments = async (postId) => {
        try {
            const dataToFetchComments = {
                postId: postId,
                parentId: 0,
                limit: commentsLimit,
                page: currentPage,
            }

            const response = await CommentService.fetchComments(dataToFetchComments);
            addFetchedComments(
                response.data.data.data,
                response.data.data.current_page
            );
            setCurrentPage(response.data.data.current_page);
            setLastPage(response.data.data.last_page);
        } catch (e) {
            console.error(e.message);
        }
    }

    const addFetchedComments = (fetchedComments, gotPage) => {
        if (fetchedComments.length > 0 && currentPage !== gotPage) {
            let existingComments = comments;

            for (let fetchedCommentIndex in fetchedComments) {
                existingComments.push(fetchedComments[fetchedCommentIndex]);
            }

            setComments(existingComments);
        }
    }

    const removeComment = (commentId) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
    }

    useEffect(() => {
        if (props.postId) {
            fetchComments(props.postId);
        }
    }, []);

    if (!comments.length) {
        return (
            <h2 style={{textAlign: 'center', margin: '1rem 0',}}>
                There are no comments for this post.
            </h2>
        );
    }

    return (
        <div>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    postId={props.postId}
                    comment={comment}
                    userId={props.userId}
                    removeCallback={removeComment}
                />
            ))}
        </div>
    );
};

export default CommentList;
