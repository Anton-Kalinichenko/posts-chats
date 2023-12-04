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
import FormInput from './components/UI/input/FormInput';
import PostFilter from './components/PostFilter';
import Modal from './components/UI/modals/Modal';

const App: FC = () => {
  const {store} = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [value, setValue] = useState('Text in input');
  const [filter, setFilter] = useState({
    sort: '',
    search: '',
  })
  const [createPostModalForm, setCreatePostModalForm] = useState(false);
  const [postNumber, setPostNumber] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      store.fetchUser();
      getPosts();
    }
  }, []);

  async function getPosts() {
    try {
      const response = await PostService.fetchPosts(filter.sort, filter.search);
      setPosts(response.data.data);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const createPost = async (newPost: INewPost) => {
    setCreatePostModalForm(false);
    let response = await PostService.createPost(newPost);

    if (response.status === 200) {
      response = await PostService.fetchPosts();
      setPosts(response.data.data);
    }
  }

  const removePost = async (postId: number) => {
    let response = await PostService.removePost(postId);

    if (response.status === 200) {
      response = await PostService.fetchPosts();
      setPosts(response.data.data);
    }
  }

  // const sortPosts = (sort: string) => {
  //   // This is sort implementation for back-end
  //   if (sort.length > 0) {
  //     setPosts([...posts].sort((a: any, b: any) => a[sort].localeCompare(b[sort])));
  //   } else {
  //     getPosts();
  //   }
  // }

  // // Example using the useMemo hook
  // const sortedAndSearchedPosts = useMemo(() => {
  //   return SortedPosts.filter(post => post.title.includes(searchQuery));
  // }, [searchQuery, sortedPosts]);

  if (store.isLoading) {
    return <div>Loading...</div>
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
          setFilter={setFilter}
          getPosts={getPosts}
        />
      </div>

      <div>
        <h3 style={{marginLeft: '1em',}}>Found {postNumber} posts</h3>
      </div>

      <div className='separate_element'>
        <PostList posts={posts} title="Post List" remove={removePost} />
      </div>
    </div>
  );
}

export default observer(App);
