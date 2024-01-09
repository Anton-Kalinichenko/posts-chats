import React from 'react';
import {useNavigate} from 'react-router-dom';
import Img404 from '../../images/404.png';
import SimpleButton from '../../components/UI/button/SimpleButton';

const Error_404 = () => {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

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

export default Error_404;
