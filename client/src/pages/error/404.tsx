import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Context} from '../../index';
import Img404 from '../../images/404.png';
import SimpleButton from '../../components/UI/button/SimpleButton';

const Error_404 = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    const backToHome = () => {
        navigate('/');
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.fetchUser();
        }
    }, []);

    return (
        <div>
            <img src={Img404} alt="Error 404" width={800} />
            <div style={{textAlign: 'center'}}>
                <SimpleButton onClick={backToHome}>
                    Back To Home
                </SimpleButton>
            </div>
        </div>
    );
}

export default observer(Error_404);
