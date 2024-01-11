import React, {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams, useNavigate} from 'react-router-dom';
import { Context } from '../index';
import PostService from '../services/PostService';
import CommentService from '../services/CommentService';
import Loader from '../components/UI/loader/Loader';
import PostItem from '../components/PostItem';
import CommentList from '../components/CommentList';
import Modal from '../components/UI/modal/Modal';
import PostForm from '../components/PostForm';
import CommentForm from '../components/CommentForm';

const Post = () => {
    const {store} = useContext(Context);
    const params: any = useParams();
    const navigate = useNavigate();
    const [post, setPost]: any = useState({});
    const [comments, setComments]: any = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editPostModalForm, setEditPostModalForm] = useState(false);
    const [commentForm, setCommentForm] = useState(false);
    const [totalComments, setTotalComments] = useState(0);

    const fetchPost = async () => {
        setIsLoading(true);

        setTimeout(async () => {
            try {
              const response = await PostService.fetchPost(params.postId);
              setPost(response.data.data);
            } catch (e) {
              console.error((e as Error).message);
            } finally {
                setIsLoading(false);
            }
          }, 1000);
    }

    const commentPost = () => {
        setCommentForm(true);
    }

    const editPost = () => {
        setEditPostModalForm(true);
    }

    const updatePost = async (dataToUpdate: any) => {
        setEditPostModalForm(false);

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

    const createComment = async (newComment: any) => {
        setCommentForm(false);
        let response = await CommentService.create(newComment);

        if (response.status === 200) {
            fetchPost();
        }
    }

    useEffect(() => {
        if (store.isAuth) {
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
            commentCallback={commentPost}
            editCallback={store.user.id === post.user_id ? editPost : undefined}
            removeCallback={store.user.id === post.user_id ? removePost: undefined}
            detailed={true}
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

        {commentForm && <CommentForm
            postId={post.id}
            userId={store.user.id}
            hideForm={setCommentForm}
            create={createComment}
        />}

        {totalComments > 0 && <h4
                style={{margin: '1rem',}}
            >
                Found {totalComments} {
                    totalComments > 1 ? 'comments' : 'comment'
                }
            </h4>
        }

        <CommentList
            postId={post.id}
            userId={store.user.id}
            setTotalComments={setTotalComments}
        />
    </div>);
}

export default observer(Post);