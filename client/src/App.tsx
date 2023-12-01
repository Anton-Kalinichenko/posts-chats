import React, { FC, useContext, useEffect, useState } from 'react';
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
import Select from './components/UI/select/Select';
import SimpleButton from './components/UI/button/SimpleButton';
import FormInput from './components/UI/input/FormInput';

const App: FC = () => {
  const {store} = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [value, setValue] = useState('Text in input');
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      store.fetchUser();
      getPosts();
    }
  }, []);

  async function getPosts(sort = '') {
    try {
      const response = await PostService.fetchPosts(sort);
      setPosts(response.data.data);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const createPost = async (newPost: INewPost) => {
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

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);

    getPosts(sort);

    // // This is sort implementation for back-end
    // if (sort.length > 0) {
    //   setPosts([...posts].sort((a: any, b: any) => a[sort].localeCompare(b[sort])));
    // } else {
    //   getPosts();
    // }
  }

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

      {store.isAuth && <div>
        <PostForm userId={store.user.id} create={createPost} />
      </div>}

      <hr style={{margin: "15px 0"}} />
      <div className='separate_element'>
        <h3 style={{marginLeft: '1em',}}>Sorting</h3>
        <Select
          defaultValue="None"
          options={[
            {value: 'title', name: 'By title'},
            {value: 'body', name: 'By content'},
          ]}
          value={selectedSort}
          onChange={sortPosts}
        />
      </div>

      {posts.length !== 0 ?
        <div className='separate_element'>
          <PostList posts={posts} title="Post List" remove={removePost} />
        </div> :
        <h2 style={{textAlign: 'center', margin: '1rem 0',}}>Posts weren't found</h2>
      }
    </div>
  );
}

export default observer(App);
