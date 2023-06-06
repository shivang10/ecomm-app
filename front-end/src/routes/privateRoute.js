import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {isUserLoggedIn} from '../utils/auth/user-auth-operations';
import {userLoginLink} from "./routesLink";

const PrivateRoute = () => {
    const auth = isUserLoggedIn();
    return auth ? <Outlet/> : <Navigate to={userLoginLink}/>;
};

export default PrivateRoute;