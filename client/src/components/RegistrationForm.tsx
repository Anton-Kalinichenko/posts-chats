import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import FormInput from './UI/input/FormInput';
import SimpleButton from './UI/button/SimpleButton';

const RegistrationForm: FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const {store} = useContext(Context);

    const registration = () => {
        store.registration(name, email, password, passwordConfirmation);
        store.fetchUser();
    }

    return (
        <div>
            <FormInput
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
            />
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
            <FormInput
                onChange={(e: any) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                placeholder="Password Confirmation"
            />
            <SimpleButton
                onClick={registration}
            >
                Register
            </SimpleButton>
        </div>
    );
};

export default observer(RegistrationForm);