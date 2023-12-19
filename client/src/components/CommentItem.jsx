import React, {useState} from 'react';
import cl from './CommentItem.module.css';
import IconButton from './UI/button/IconButton';
import { ReactComponent as CommentRegular} from '../images/icons/comment-regular.svg';
import { ReactComponent as PenToSquareSolid} from '../images/icons/pen-to-square-solid.svg';
import { ReactComponent as TrashCanSolid} from '../images/icons/trash-can-solid.svg';
import {formatTimeString} from '../utils/dates';
import CommentForm from '../components/CommentForm';
import CommentService from '../services/CommentService';

const CommentItem = (props) => {
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [comment, setComment] = useState({
        id: props.comment.id,
        body: props.comment.body,
        userId: props.comment.user.id,
        userName: props.comment.user.name,
        createdAt: props.comment.created_at,
        updatedAt: props.comment.updated_at,
    });

    const edit = () => {
        setShowEditCommentForm(true);
    };

    const updateComment = async (dataToUpdate) => {
        setShowEditCommentForm(false);
        let response = await CommentService.update(dataToUpdate);

        if (response.status === 200 ) {
            fetchComment(comment.id);
        }
    }

    const fetchComment = async (commentId) => {
        let response = await CommentService.fetchComment(commentId);

        if (response.status === 200) {
            setComment({
                ...comment,
                body: response.data.data.body,
                updatedAt: response.data.data.updated_at,
            });
        }
    }

    const remove = async () => {
        let response = await CommentService.remove(comment.id);

        if (response.status === 200 && props.removeCallback !== undefined) {
            props.removeCallback(comment.id);
        }
    }

    return (
        <div className={cl.comment}>
            {showEditCommentForm ?
                <CommentForm
                    commentId={comment.id}
                    body={comment.body}
                    hideForm={setShowEditCommentForm}
                    update={updateComment}
                /> :
                <div>
                    <div className={cl.commentBody}>
                        <div>
                            {comment.body}
                        </div>
                        <div className={cl.commentBtns}>
                            <IconButton
                                onClick={props.commentCallback}
                                title="Comment"
                            >
                                <CommentRegular style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                            </IconButton>

                            {props.userId === comment.userId && <div style={{display: 'flex',}}>
                                <IconButton
                                    onClick={edit}
                                    title="Edit"
                                >
                                    <PenToSquareSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                                </IconButton>

                                <IconButton
                                    onClick={remove}
                                    title="Delete"
                                >
                                    <TrashCanSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                                </IconButton>
                            </div>}
                        </div>
                    </div>
                    <div className={cl.commentDetails}>
                        <div style={{marginRight: 'auto',}}>
                            From: <strong>{props.userId !== comment.userId ?
                                comment.userName :
                                'You'
                            }</strong>
                        </div>
                        <div style={{marginLeft: 'auto',}}>
                            {comment.createdAt === comment.updatedAt ?
                                <span>Created: <strong>{formatTimeString(comment.createdAt)}</strong></span> :
                                <span>Updated: <strong>{formatTimeString(comment.updatedAt)}</strong></span>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default CommentItem;
