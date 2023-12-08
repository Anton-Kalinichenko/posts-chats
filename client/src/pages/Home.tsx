import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { Context } from '../index';
import SocialMediaPosts from '../images/types-of-social-media-posts.jpg';
import SimpleLink from '../components/UI/link/SimpleLink';

const Home = () => {
    const {store} = useContext(Context);

    return (
        <div>
            <h2 className="page-title">Posts - Chats</h2>

            <div style={{textAlign: 'center',}}>
                <img
                    src={SocialMediaPosts}
                    alt="Social Media Posts"
                />
            </div>

            <p style={{margin: '1rem',}}>
                This site contains publications and chat rooms for their discussion.
            </p>
            {!store.isAuth && <p style={{margin: '1rem',}}>
                Hello, Guest! To get access to Posts and Chats on this site you need to <span>
                    <Link to="/login">Log In</Link>
                </span> or <span>
                    <Link to="/register">Register</Link>
                </span>.
            </p>}
            {store.isAuth && !store.user.email_verified_at && <>
                <p style={{margin: '1rem',}}>
                    Your Registration almost done. To complete the registration you need to check the confirmation in your email <span>
                        {store.user.email}
                    </span>.
                </p>
                <p style={{margin: '1rem',}}>
                    If you didn't get a confirmation on your email, or if you lost your confirmation, you can <span>
                        <SimpleLink
                            args={null}
                            active={true}
                            moveTo={store.sendEmailConfirmationNotification}
                        >
                            Resend Email Confirmation
                        </SimpleLink>
                    </span>.
                </p>
            </>}
        </div>
    );
}

export default observer(Home);
