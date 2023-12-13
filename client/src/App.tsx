import React, { FC } from 'react';
import './styles/App.css';
import {observer} from "mobx-react-lite";
import { BrowserRouter } from 'react-router-dom';
import TopNavbar from './components/UI/navbar/TopNavbar';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <TopNavbar />

        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
