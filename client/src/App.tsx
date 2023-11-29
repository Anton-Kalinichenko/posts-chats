import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { Context } from './index';
import {observer} from "mobx-react-lite";
import {IPost} from './models/IPost';
import PostService from './services/PostService';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostList from './components/PostList';

const App: FC = () => {
  const {store} = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [value, setValue] = useState('Text in input');

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      store.fetchUser();
    }
  }, []);

  async function getPosts() {
    try {
      const response = await PostService.fetchPosts();
      setPosts(response.data.data);
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <div>
          <LoginForm />
        </div>
        <div>
          <RegistrationForm />
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>{ store.isAuth ? `Hello, ${store.user.name}!` : 'PLEASE AUTHENTICATE!' }</h1>
      <h1>{store.user.email_verified_at ? 'Email has been confirmed' : 'PLEASE CONFIRM YOUR EMAIL!'}</h1>
      {!store.user.email_verified_at && <div>
        <button onClick={store.sendEmailConfirmationNotification}>Resend Email Confirmation</button>
      </div>}
      <button onClick={() => store.logout()}>Log Out</button>

      <div>
        <h3>{value}</h3>
        <input
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Counter />
        <ClassCounter />
      </div>

      <div>
        <button onClick={getPosts}>Get Posts</button>
      </div>

      {typeof posts !== 'undefined' && posts.length > 0 &&
        <PostList posts={posts} title="Post List" />
      }
    </div>
  );
}

export default observer(App);
