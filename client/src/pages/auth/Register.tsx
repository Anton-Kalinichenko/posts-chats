import React, {useContext, useEffect} from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import RegistrationForm from '../../components/RegistrationForm';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isAuth) {
            navigate('/');
        }
    }, [store.isAuth])

    return (
        <div style={{width: '18rem', margin: 'auto',}}>
            <h3 style={{margin: '1em',}}>Registration</h3>
            <div>
                <RegistrationForm />
            </div>
        </div>
    );
}

export default observer(Register);
