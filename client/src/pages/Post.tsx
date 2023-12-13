import React, {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams, useNavigate} from 'react-router-dom';
import { Context } from '../index';
import PostService from '../services/PostService';
import Loader from '../components/UI/loader/Loader';
import PostItem from '../components/PostItem';
import CommentItem from '../components/CommentItem';
import Modal from '../components/UI/modal/Modal';
import PostForm from '../components/PostForm';

const Post = () => {
    const {store} = useContext(Context);
    const params: any = useParams();
    const navigate = useNavigate();
    const [post, setPost]: any = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [editPostModalForm, setEditPostModalForm] = useState(false);

    const fetchPost = async () => {
        setIsLoading(true);

        setTimeout(async () => {
            try {
              const response = await PostService.fetchPost(params.postId);
              setPost(response.data.data);

              console.log('openPost response.data.data:', response.data.data);

            } catch (e) {
              console.error((e as Error).message);
            } finally {
                setIsLoading(false);
            }
          }, 1000);
    }

    const editPost = () => {
        setEditPostModalForm(true);
    }

    const updatePost = async (dataToUpdate: any) => {
        setEditPostModalForm(false);

        console.log('updatePost editedPost:', dataToUpdate);

        let response = await PostService.update(dataToUpdate);

        if (response.status === 200) {
            fetchPost();
        }
    }

    const removePost = async (postId: number) => {
        let response = await PostService.remove(postId);

        if (response.status === 200) {
            navigate('/posts');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.fetchUser();
            fetchPost();
        }
    }, []);

    if (isLoading) {
        return (<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Loader />
        </div>);
      }

    return (<div>
        <PostItem
            post={post}
            index={null}
            editCallback={editPost}
            removeCallback={removePost}
        />

        <Modal visible={editPostModalForm} setVisible={setEditPostModalForm}>
            <PostForm
                postId={post.id}
                title={post.title}
                body={post.body}
                update={updatePost}
                hideModal={setEditPostModalForm}
            />
        </Modal>

        {typeof post.comments !== 'undefined' && post.comments.length > 0 && post.comments.map((comment: any) => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>);
}

export default observer(Post);