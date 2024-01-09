import Home from '../pages/Home';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Error404 from '../pages/error/404';

export const sharedRoutes = [
    {path: '/', component: <Home />},
    {path: '*', component: <Error404 />},
];

export const publicRoutes = [
    {path: '/login', component: <Login />},
    {path: '/register', component: <Register />},
]

export const privateRoutes = [
    {path: '/posts', component: <Posts />},
    {path: '/posts/:postId', component: <Post />},
];