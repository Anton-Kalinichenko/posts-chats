import React, { FC, useContext, useEffect, useState } from 'react';
import './styles/App.css';
import { Context } from './index';
import {observer} from "mobx-react-lite";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import TopNavbar from './components/UI/navbar/TopNavbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App: FC = () => {
  const {store} = useContext(Context);

  return (
    <div className='App'>
      <BrowserRouter>
        <TopNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts"
            element={store.isAuth && store.user.email_verified_at ? <Posts /> : <Navigate to="/" />}
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
