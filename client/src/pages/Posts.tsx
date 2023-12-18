import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import {IPost} from '../models/IPost';
import {INewPost} from '../models/INewPost';
import PostService from '../services/PostService';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import SimpleButton from '../components/UI/button/SimpleButton';
import PostFilter from '../components/PostFilter';
import Modal from '../components/UI/modal/Modal';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';

const Posts: FC = () => {
  const {store} = useContext(Context);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const postsLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    sort: '',
    search: '',
  })
  const [createPostModalForm, setCreatePostModalForm] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [startPostIndex, setStartPostIndex] = useState(1);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      store.fetchUser();
      fetchPosts(filter.sort, filter.search, postsLimit, currentPage);
    }
  }, []);

  async function fetchPosts(sort: string, search: string, limit: number, page: number) {
    setIsPostsLoading(true);

    setTimeout(async () => {
      try {
        const response = await PostService.fetchPosts(sort, search, limit, page);
        setPosts(response.data.data.data);
        setTotalPostCount(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setStartPostIndex(limit * (page - 1));
      } catch (e) {
        console.error((e as Error).message);
      } finally {
        setIsPostsLoading(false);
      }
    }, 1000);
  }

  const createPost = async (newPost: INewPost) => {
    setCreatePostModalForm(false);
    let response = await PostService.create(newPost);

    if (response.status === 200) {
      fetchPosts(filter.sort, filter.search, postsLimit, currentPage);
    }
  }

  const openPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  }

  const selectPage = async (page: number) => {
    setCurrentPage(page);
    await fetchPosts(filter.sort, filter.search, postsLimit, page);
  }

  if (store.isLoading) {
    return (<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
      <Loader />
    </div>);
  }

  return (
    <div className='App'>
      <div className='separate_element'>
        <PostFilter
          filter={filter}
          limit={postsLimit}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          fetchPosts={fetchPosts}
        />
      </div>

      <SimpleButton onClick={() => setCreatePostModalForm(true)} style={{marginBottom: '2rem',}}>
        Create Post
      </SimpleButton>

      <Modal visible={createPostModalForm} setVisible={setCreatePostModalForm}>
        <PostForm userId={store.user.id} create={createPost} hideModal={setCreatePostModalForm} />
      </Modal>

      <div>
        <h3 style={{marginLeft: '1em',}}>Found {totalPostCount} {totalPostCount === 1 ? 'post' : 'posts'}</h3>
      </div>

      <div className='separate_element'>
        {isPostsLoading ?
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <Loader />
          </div> :
          <PostList posts={posts} title="Post List" openPost={openPost} startIndex={startPostIndex} />
        }
      </div>

      <Pagination
        itemsCount={totalPostCount}
        itemsPerPage={postsLimit}
        currentPage={currentPage}
        selectPage={selectPage}
      />
    </div>
  );
}

export default observer(Posts);
