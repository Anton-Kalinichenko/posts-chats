import React, {useState} from 'react';
import IconButton from './UI/button/IconButton';
import { ReactComponent as XmarkSolid} from '../images/icons/xmark-solid.svg';
import TextArea from './UI/input/TextArea';
import SubmitButton from './UI/button/SubmitButton';

const CommentForm = (props) => {
    const [comment, setComment] = useState({
        body: props.body !== undefined ? props.body : '',
    });

    const addNewComment = async (e: any) => {
        e.preventDefault();

        const newComment = {
          body: comment.body,
          postId: props.postId,
          userId: props.userId,
          parentId: props.parentId !== undefined ? props.parentId : null,
        };

        props.create(newComment);

        setComment({
          body: '',
        });
    }

    const updateComment = async (e: any) => {
        e.preventDefault();

        const dataToUpdate = {
            body: comment.body,
            commentId: props.commentId,
        };

        props.update(dataToUpdate);
    }

    return (
        <form style={{padding: '1rem', background: 'lavender', borderRadius: '5px',}}>
            <IconButton
                title="Close"
                style={{textAlign: 'end', cursor: 'auto',}}
            >
                <XmarkSolid
                    onClick={() => props.hideForm(false)}
                    style={{width: 20, height: 20, margin: '0 0.5rem', cursor: 'pointer',}}
                />
            </IconButton>

            <div style={{display: 'flex',}}>
                <h4 style={{marginTop: '1.2rem', marginBottom: 'auto',}}>Comment</h4>
                <TextArea
                    rows="7"
                    placeholder="Your Comment..."
                    value={comment.body}
                    onChange={e => setComment({...comment, body: e.target.value})}
                    style={{width: '80%', marginLeft: 'auto',}}
                />
            </div>

            <div style={{textAlign: 'end',}}>
                {props.create !== undefined && <SubmitButton
                    onClick={addNewComment}>Create
                </SubmitButton>
                }
                {props.update !== undefined && <SubmitButton
                    onClick={updateComment}>Update
                </SubmitButton>
                }
            </div>
        </form>
    );
}

export default CommentForm;