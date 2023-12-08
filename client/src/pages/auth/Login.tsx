import React, {useContext, useEffect} from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isAuth) {
            navigate('/posts');
        }
    }, [store.isAuth])

    return (
        <div style={{width: '18rem', margin: 'auto',}}>
            <h3 style={{margin: '1em',}}>Log In</h3>
            <div>
                <LoginForm />
            </div>
        </div>
    );
}

export default observer(Login);
