import React from 'react';
import SimpleButton from './UI/button/SimpleButton';

const PostItem = (props) => {
    const removePost = () => {
        props.remove(props.post.id);
    };

    return (
        <div className="post">
            <div className="post__content">
                <strong>{`${props.index + 1}. ${props.post.title}`}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <SimpleButton
                    onClick={removePost}
                    style={{marginLeft: '0.5em', marginRight: '0.5em'}}
                >
                    Delete
                </SimpleButton>
            </div>
        </div>
    );
};

export default PostItem;
