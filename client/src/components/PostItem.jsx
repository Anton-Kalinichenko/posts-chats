import React from 'react';
import IconButton from './UI/button/IconButton';
import { ReactComponent as EyeSolid} from '../images/icons/eye-solid.svg';
import { ReactComponent as PenToSquareSolid} from '../images/icons/pen-to-square-solid.svg';
import { ReactComponent as TrashCanSolid} from '../images/icons/trash-can-solid.svg';

const PostItem = (props) => {
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

    const remove = async () => {
        if (props.removeCallback !== undefined) {
            props.removeCallback(props.post.id);
       }
    }

    return (
        <div className="post">
            <div className="post__content">
                <h3>{`${props.index !== null && props.index >= 0 ? props.index + 1 : ''}${props.index !== null &&  props.index >= 0 ? '.' : ''} ${props.post.title}`}</h3>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns" style={{display: 'flex', marginBottom: 'auto'}}>
                {props.openCallback !== undefined && <IconButton
                        onClick={open}
                        title="Open"
                    >
                        <EyeSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
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
                        onClick={remove}
                        title="Delete"
                    >
                        <TrashCanSolid style={{width: 20, height: 20, margin: '0 0.5rem',}} />
                    </IconButton>
                }
            </div>
        </div>
    );
};

export default PostItem;
