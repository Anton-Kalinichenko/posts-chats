import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import FormInput from './UI/input/FormInput';
import SimpleButton from './UI/button/SimpleButton';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <FormInput
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <FormInput
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <SimpleButton onClick={() => {store.login(email, password)}}>Log In</SimpleButton>
        </div>
    );
};

export default observer(LoginForm);