import React from 'react';
import PostItem from './PostItem';

const PostList = ({posts, title}) => {
    return (
        <div>
            <h2 style={{textAlign: 'center',}}>{title}</h2>
            {posts.map((post, index) => (
                <PostItem key={post.id} post={post} index={index} />
            ))}
        </div>
    );
}

export default PostList;
