import React, {useState} from 'react';
import IconButton from './UI/button/IconButton';
import { ReactComponent as EyeSolid} from '../images/icons/eye-solid.svg';
import { ReactComponent as CommentRegular} from '../images/icons/comment-regular.svg';
import { ReactComponent as PenToSquareSolid} from '../images/icons/pen-to-square-solid.svg';
import { ReactComponent as TrashCanSolid} from '../images/icons/trash-can-solid.svg';
import {formatTimeString} from '../utils/dates';
import ConfirmationModal from './UI/modal/ConfirmationModal';

const PostItem = (props) => {
    const [visibleConfirmationModal, setVisibleConfirmationModal] = useState(false);

    const open = () => {
        if (props.openCallback !== undefined) {
            props.openCallback(props.post.id)
        }
    };

    const edit = () => {
        if (props.editCallback !== undefined) {
            props.editCallback(props.post);
       }
    };

    const removeConfirmation = () => {
        setVisibleConfirmationModal(true);
    }

    const remove = async () => {
        setVisibleConfirmationModal(false);

        if (props.removeCallback !== undefined) {
            props.removeCallback(props.post.id);
       }
    }

    return (
        <div>
            <div className="post">
                <div style={{display: 'flex',}}>
                    <div className="post__content">
                        <h3>{`${props.index !== null && props.index >= 0 ? props.index + 1 : ''}${props.index !== null &&  props.index >= 0 ? '.' : ''} ${props.post.title}`}</h3>
                        <div>
                            {props.post.body}
                        </div>
                    </div>
                    <div className="post__btns" style={{display: 'flex', marginBottom: 'auto', marginLeft: 'auto',}}>
                        {props.openCallback !== undefined && <IconButton
                                onClick={open}
                                title="Open"
                            >
                                <EyeSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                            </IconButton>
                        }

                        {props.commentCallback !== undefined && <IconButton
                                onClick={props.commentCallback}
                                title="Comment"
                            >
                                <CommentRegular style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                            </IconButton>
                        }

                        {props.editCallback !== undefined && <IconButton
                                onClick={edit}
                                title="Edit"
                            >
                                <PenToSquareSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                            </IconButton>
                        }

                        {props.removeCallback !== undefined && <IconButton
                                onClick={removeConfirmation}
                                title="Delete"
                            >
                                <TrashCanSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                            </IconButton>
                        }
                    </div>
                </div>

                {props.detailed !== undefined && props.detailed && <div
                    style={{display: 'flex', marginTop: '1rem',}}
                >
                    <div style={{marginRight: 'auto',}}>
                        From: <strong>{props.post?.user?.name}</strong>
                    </div>
                    <div style={{marginLeft: 'auto',}}>
                        {props.post.created_at === props.post.updated_at ?
                            <span>Created: <strong>{formatTimeString(props.post.created_at)}</strong></span> :
                            <span>Updated: <strong>{formatTimeString(props.post.updated_at)}</strong></span>
                        }
                    </div>
                </div>}
            </div>

            <ConfirmationModal
                visible={visibleConfirmationModal}
                setVisible={setVisibleConfirmationModal}
                title='Post Deleting'
                content={`Are you sure you want to delete post ${props.post.title} with its comments?`}
                confirmAction={remove}
            />
        </div>
    );
};

export default PostItem;
