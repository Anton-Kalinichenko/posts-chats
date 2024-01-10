import React, {useContext, useState, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from '../index';
import cl from './CommentItem.module.css';
import IconButton from './UI/button/IconButton';
import { ReactComponent as CommentRegular} from '../images/icons/comment-regular.svg';
import { ReactComponent as PenToSquareSolid} from '../images/icons/pen-to-square-solid.svg';
import { ReactComponent as TrashCanSolid} from '../images/icons/trash-can-solid.svg';
import {formatTimeString} from '../utils/dates';
import CommentForm from '../components/CommentForm';
import CommentService from '../services/CommentService';
import ConfirmationModal from './UI/modal/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CommentList from './CommentList';

const CommentItem = (props) => {
    const {store} = useContext(Context);
    const [showCreateCommentForm, setShowCreateCommentForm] = useState(false);
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [comment, setComment] = useState({
        id: props.comment.id,
        body: props.comment.body,
        userId: props.comment.user.id,
        userName: props.comment.user.name,
        createdAt: props.comment.created_at,
        updatedAt: props.comment.updated_at,
        repliesCount: props.comment.repliesCount,
    });
    const [visibleConfirmationModal, setVisibleConfirmationModal] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const timestamp = useRef(0);

    const create = () => {
        setShowCreateCommentForm(true);
        setShowEditCommentForm(false);
    }

    const createComment = async (newComment) => {
        setShowCreateCommentForm(false);
        let response = await CommentService.create(newComment);

        if (response.status === 200) {
            fetchComment(comment.id);

            if (showReplies) {
                timestamp.current = new Date().getTime();
            }
        }
    }

    const edit = () => {
        setShowEditCommentForm(true);
        setShowCreateCommentForm(false);
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

    const removeConfirmation = () => {
        setVisibleConfirmationModal(true);
    }

    const remove = async () => {
        setVisibleConfirmationModal(false);
        let response = await CommentService.remove(comment.id);

        if (response.status === 200 && props.removeCallback !== undefined) {
            props.removeCallback(comment.id);
        }
    }

    return (
        <div>
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
                                    onClick={create}
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
                                        onClick={removeConfirmation}
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
                {showCreateCommentForm && <CommentForm
                        postId={props.postId}
                        parentId={comment.id}
                        userId={store.user.id}
                        hideForm={setShowCreateCommentForm}
                        create={createComment}
                    />
                }
            </div>

            {comment.repliesCount > 0 && <div>
                    <div style={{display: 'flex',}}>
                        <div style={{marginLeft: 'auto'}}>
                            {comment.repliesCount} {comment.repliesCount > 1 ? 'replies' : 'reply'}
                        </div>
                        <div style={{marginRight: '1rem'}}>
                            {!showReplies ?
                                <IconButton
                                    title="Show Replies"
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        onClick={() => setShowReplies(true)}
                                        style={{width: 20, height: 20, margin: '0 0.5rem', cursor: 'pointer',}}
                                    />
                                </IconButton> :
                                <IconButton
                                    title="Hide Replies"
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronUp}
                                        onClick={() => setShowReplies(false)}
                                        style={{width: 20, height: 20, margin: '0 0.5rem', cursor: 'pointer',}}
                                    />
                                </IconButton>
                            }
                        </div>
                    </div>
                </div>
            }

            {showReplies &&
                <div style={{width: '90%', marginLeft: 'auto',}}>
                    <CommentList
                        key={`comment_list_${timestamp.current}`}
                        postId={props.postId}
                        parentId={comment.id}
                        userId={store.user.id}
                    />
                </div>
            }

            <ConfirmationModal
                visible={visibleConfirmationModal}
                setVisible={setVisibleConfirmationModal}
                title='Comment Deleting'
                content={`Are you sure you want to delete the comment ${comment.body} with its replies?`}
                confirmAction={remove}
            />
        </div>
    );
}

export default observer(CommentItem);
