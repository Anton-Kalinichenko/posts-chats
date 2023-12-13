import React, { useState } from 'react';
import SubmitButton from './UI/button/SubmitButton';
import IconButton from './UI/button/IconButton';
import { ReactComponent as XmarkSolid} from '../images/icons/xmark-solid.svg';
import FormInput from './UI/input/FormInput';

const PostForm = (props) => {
    const [post, setPost] = useState({
        title: props.title !== undefined ? props.title : '',
        body: props.body !== undefined ? props.body : '',
    });

    const addNewPost = async (e) => {
      e.preventDefault();

      const newPost = {
        title: post.title,
        body: post.body,
        userId: props.userId
      };

      props.create(newPost);

      setPost({
        title: '',
        body: '',
      });
    }

    const updatePost = async (e) => {
      e.preventDefault();

      const dataToUpdate = {
        title: post.title,
        body: post.body,
        postId: props.postId
      };

      props.update(dataToUpdate);
    }

    return (
        <form style={{paddingRight: '1rem',}}>
          <IconButton
            title="Close"
            style={{textAlign: 'end', cursor: 'auto',}}
          >
            <XmarkSolid
              onClick={() => props.hideModal(false)}
              style={{width: 20, height: 20, margin: '0 0.5rem', cursor: 'pointer',}}
            />
          </IconButton>
          <FormInput
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            style={{width: '90%',}}
          />
          <FormInput
            type="text"
            placeholder="Content"
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            style={{width: '90%',}}
          />
          {props.create !== undefined && <SubmitButton
              onClick={addNewPost}>Create
            </SubmitButton>
          }
          {props.update !== undefined && <SubmitButton
              onClick={updatePost}>Update
            </SubmitButton>
          }
        </form>
    );
}

export default PostForm;
