import React from 'react';
import PostItem from './PostItem';

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return (
            <h2 style={{textAlign: 'center', margin: '1rem 0',}}>Posts weren't found</h2>
        );
    }

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
