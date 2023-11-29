import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";

const RegistrationForm: FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <input
                onChange={e => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                placeholder="Password Confirmation"
            />
            <button onClick={() => {store.registration(name, email, password, passwordConfirmation)}}>Register</button>
        </div>
    );
};

export default observer(RegistrationForm);