import React, { FC, useContext, useEffect, useState, useMemo } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { Context } from './index';
import {observer} from "mobx-react-lite";
import {IPost} from './models/IPost';
import {INewPost} from './models/INewPost';
import PostService from './services/PostService';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import SimpleButton from './components/UI/button/SimpleButton';
import SimpleLink from './components/UI/link/SimpleLink';
import FormInput from './components/UI/input/FormInput';
import PostFilter from './components/PostFilter';
import Modal from './components/UI/modals/Modal';
// import {usePosts} from './hooks/usePosts';
import Loader from './components/UI/loader/Loader';
import {usePagination} from './hooks/usePagination';

const App: FC = () => {
  const {store} = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const postsLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('Text in input');
  const [filter, setFilter] = useState({
    sort: '',
    search: '',
  })
  const [createPostModalForm, setCreatePostModalForm] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  // const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.search);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const pagesArray = usePagination(totalPostCount, postsLimit);
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
        setPosts(response.data.data.posts);
        setTotalPostCount(response.data.data.post_count);
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
    let response = await PostService.createPost(newPost);

    if (response.status === 200) {
      fetchPosts(filter.sort, filter.search, postsLimit, currentPage);
    }
  }

  const removePost = async (postId: number) => {
    let response = await PostService.removePost(postId);

    if (response.status === 200) {
      fetchPosts(filter.sort, filter.search, postsLimit, currentPage);
    }
  }

  const selectPage = async (page: number) => {
    setCurrentPage(page);
    await fetchPosts(filter.sort, filter.search, postsLimit, page);
  }

  if (store.isLoading) {
    return <h1>Loading...</h1>
  }

  if (!store.isAuth) {
    return (
      <div>
        <div>
          <h3 style={{margin: '1em',}}>Log In</h3>
          <div>
            <LoginForm />
          </div>
        </div>
        <div>
          <h3 style={{margin: '1em',}}>Registration</h3>
          <div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      <h1 className='separate_element'>
        { store.isAuth ? `Hello, ${store.user.name}!` : 'PLEASE AUTHENTICATE!' }
      </h1>

      <h1 className='separate_element'>
        {store.user.email_verified_at ? '' : 'PLEASE CONFIRM YOUR EMAIL!'}
      </h1>

      {!store.user.email_verified_at && <div className='separate_button'>
        <SimpleButton onClick={store.sendEmailConfirmationNotification}>Resend Email Confirmation</SimpleButton>
      </div>}

      <SimpleButton onClick={() => store.logout()} className='separate_button'>
        Log Out
      </SimpleButton>

      <div className='separate_element'>
        <h3 style={{marginLeft: '1em',}}>{value}</h3>
        <FormInput
          type="text"
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
      </div>

      <div className='separate_element'>
        <Counter />
      </div>

      <div className='separate_element'>
        <ClassCounter />
      </div>

      <hr style={{margin: "15px 0"}} />

      <SimpleButton onClick={() => setCreatePostModalForm(true)} className='separate_button'>
        Create Post
      </SimpleButton>

      <Modal visible={createPostModalForm} setVisible={setCreatePostModalForm}>
        <PostForm userId={store.user.id} create={createPost} />
      </Modal>

      <div className='separate_element'>
        <PostFilter
          filter={filter}
          limit={postsLimit}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          fetchPosts={fetchPosts}
        />
      </div>

      <div>
        <h3 style={{marginLeft: '1em',}}>Found {totalPostCount} {totalPostCount === 1 ? 'post' : 'posts'}</h3>
      </div>

      <div className='separate_element'>
        {isPostsLoading ?
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <Loader />
          </div> :
          <PostList posts={posts} title="Post List" remove={removePost} startIndex={startPostIndex} />
        }
      </div>

      <div style={{margin: '2rem 0', textAlign: 'center',}}>
        {pagesArray.map(page =>
          <SimpleLink
            key={page}
            args={page}
            active={page === currentPage ? true : false}
            moveTo={selectPage}
          >
            {page}
          </SimpleLink>
        )}
      </div>
    </div>
  );
}

export default observer(App);
