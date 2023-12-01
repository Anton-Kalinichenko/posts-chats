import React from 'react';
import PostItem from './PostItem';

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h2 style={{textAlign: 'center',}}>{title}</h2>
            {posts.map((post, index) => (
                <PostItem key={post.id} post={post} index={index} remove={remove} />
            ))}
        </div>
    );
}

export default PostList;
