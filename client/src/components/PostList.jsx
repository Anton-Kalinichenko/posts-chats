import React from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const PostList = ({posts, title, openPost, startIndex}) => {
    if (!posts.length) {
        return (
            <h2 style={{textAlign: 'center', margin: '1rem 0',}}>Posts weren't found</h2>
        );
    }

    return (
        <div>
            <h2 style={{textAlign: 'center',}}>{title}</h2>
            <TransitionGroup>
                {posts.map((post, index) => (
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem
                            post={post}
                            index={index + startIndex}
                            openCallback={openPost}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
}

export default PostList;
