import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from '../index';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Error404 from '../pages/error/404';

const AppRouter = () => {
    const {store} = useContext(Context);

    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts"
            element={store.isAuth && store.user.email_verified_at ? <Posts /> : <Navigate to="/" />}
          />
          <Route
            path="/posts/:postId"
            element={store.isAuth && store.user.email_verified_at ? <Post /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={store.isAuth && store.user.email_verified_at ?
              <Navigate to="/posts" /> :
                store.isAuth && !store.user.email_verified_at ?
                  <Navigate to="/" /> :
              <Login />
            }
          />
          <Route path="/register" element={store.isAuth ? <Navigate to="/" /> : <Register />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default observer(AppRouter);
