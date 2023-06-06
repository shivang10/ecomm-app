import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {isUserLoggedIn} from '../utils/auth/user-auth-operations';
import {homepageLink} from "./routesLink";

const PublicRoute = () => {
    const auth = isUserLoggedIn();
    return auth ? <Navigate to={homepageLink}/> : <Outlet/>;
};

export default PublicRoute;