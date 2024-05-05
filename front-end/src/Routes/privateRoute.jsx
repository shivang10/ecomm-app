import React from "react";

import {Navigate, Outlet} from "react-router-dom";

import {userLoginLink} from "./routesLink";
import {isUserLoggedIn} from "../Utils/auth/profile-auth-operations";

const PrivateRoute = () => {
    return isUserLoggedIn ? <Outlet/> : <Navigate to={userLoginLink}/>;
};

export default PrivateRoute;