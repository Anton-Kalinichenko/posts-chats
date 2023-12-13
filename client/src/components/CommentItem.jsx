import React from 'react';
import cl from './CommentItem.module.css';

const CommentItem = (props) => {
    return (
        <div>
            <div className={cl.commentBody}>{props.comment.body}</div>
        </div>
    );
}

export default CommentItem;
