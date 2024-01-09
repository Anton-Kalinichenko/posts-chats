import React, {useContext, useEffect, useState} from 'react';
import cl from './TopNavbar.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { Context } from '../../../index';
import {observer} from "mobx-react-lite";

const TopNavbar = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const setLinkStyles = (isActive, isPending, isTransitioning) => {
        return [
            cl.navbar__link,
            isPending ? cl.pending : "",
            isActive ? cl.active : "",
            isTransitioning ? cl.transitioning : "",
        ].join(" ");
    }

    const logout = (e) => {
        e.preventDefault();
        store.setAuth(false);
        store.logout();
        navigate('/');
    }

    useEffect(() => {
        if (store.isAuth) {
            setUserName(store.user.name);
        } else {
            setUserName('Guest');
        }
    }, [store.isAuth]);

    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__links}>
                <NavLink
                    to="/"
                    className={({isActive, isPending, isTransitioning}) => setLinkStyles(isActive, isPending, isTransitioning)}
                >
                    Home
                </NavLink>

                {store.isAuth ?
                    <>
                        {store.user.email_verified_at && <NavLink
                            to="/posts"
                            className={({isActive, isPending, isTransitioning}) => setLinkStyles(isActive, isPending, isTransitioning)}
                        >
                            Posts
                        </NavLink>}
                        <NavLink
                            to="/"
                            className={`${cl.navbar__link} ${cl.pending}`}
                            onClick={e => logout(e)}
                        >
                            Logout
                        </NavLink>
                    </> :
                    <>
                        <NavLink
                            to="/login"
                            className={({isActive, isPending, isTransitioning}) => setLinkStyles(isActive, isPending, isTransitioning)}
                        >
                            Log In
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({isActive, isPending, isTransitioning}) => setLinkStyles(isActive, isPending, isTransitioning)}
                        >
                            Register
                        </NavLink>
                    </>
                }
            </div>
            <div className={cl.navbar__greeting}>
                {/* <h3>Hello, {Object.keys(store.user).length > 0 ? store.user.name : 'Guest'}!</h3> */}
                <h3>Hello, {userName}!</h3>
            </div>
        </div>
    );
}

export default observer(TopNavbar);
