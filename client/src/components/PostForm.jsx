import React, { useState } from 'react';
import SubmitButton from './UI/button/SubmitButton';
import FormInput from './UI/input/FormInput';

const PostForm = ({userId, create}) => {
    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    const addNewPost = async (e) => {
        e.preventDefault();

        const newPost = {
          title: post.title,
          body: post.body,
          userId: userId
        };

        create(newPost);

        setPost({
            title: '',
            body: '',
        });
      }

    return (
        <form>
          <FormInput
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            style={{width: '100%',}}
          />
          <FormInput
            type="text"
            placeholder="Content"
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            style={{width: '100%',}}
          />
          <SubmitButton onClick={addNewPost}>Create Post</SubmitButton>
        </form>
    );
}

export default PostForm;
