import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from '../index';
import {Routes, Route} from 'react-router-dom';
import {sharedRoutes, publicRoutes, privateRoutes} from '../router/index';

const AppRouter = () => {
    const {store} = useContext(Context);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('access_token') && !store.isAuth) {
        store.fetchUser();
      }

      setIsAuth(store.isAuth);
    }, [store.isAuth]);

    return (
        <Routes>
          {isAuth ? <>
              {privateRoutes.map((route: any) => (
                <Route key={route.path} path={route.path} element={route.component} />
              ))}
            </> : <>
              {publicRoutes.map((route: any) => (
                <Route key={route.path} path={route.path} element={route.component} />
              ))}
            </>
          }
          {sharedRoutes.map((route: any) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Routes>
    );
}

export default observer(AppRouter);
