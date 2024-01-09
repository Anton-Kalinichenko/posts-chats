import React, {useState, useEffect, useMemo} from 'react';
import CommentItem from './CommentItem';
import CommentService from '../services/CommentService';
import { InView } from 'react-intersection-observer';

const CommentList = (props) => {
    const postId = props.postId;
    const parentId = props.parentId !== undefined ? props.parentId : 0;
    const [comments, setComments] = useState([]);
    const commentsLimit = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);

    const fetchComments = async (page) => {
        try {
            const dataToFetchComments = {
                postId: postId,
                parentId: parentId,
                limit: commentsLimit,
                page: page,
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
        if (fetchedComments.length > 0 && gotPage !== currentPage) {
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

    const fetchMoreComments = (inView) => {
        if (inView) {
            if (currentPage < lastPage) {
                const page = currentPage + 1;
                fetchComments(page);
            }
        }
    }

    const commentListData = useMemo(() => {
        if (Array.isArray(comments) && comments.length > 0) {

          return comments.slice();
        }

        return [];
      }, [currentPage, comments]);

    useEffect(() => {
        if (props.postId) {
            fetchComments(currentPage);
        }
    }, []);

    return (
        <div>
            {comments.length ? <div>
                    {commentListData.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            postId={props.postId}
                            comment={comment}
                            userId={props.userId}
                            removeCallback={removeComment}
                        />
                    ))}
                    <InView
                        as="div"
                        trackVisibility={true}
                        delay={100}
                        initialInView={false}
                        onChange={(inView, entry) => fetchMoreComments(inView)}
                    >
                        <div>&nbsp;</div>
                    </InView>
                </div> :
                <h2 style={{textAlign: 'center', margin: '1rem 0',}}>
                    There are no comments for this post.
                </h2>
            }
        </div>
    );
};

export default CommentList;
