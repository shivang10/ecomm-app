import React from "react";

import {Navigate, Outlet} from "react-router-dom";

import {homepageLink} from "./routesLink";
import {isUserLoggedIn} from "../utils/auth/user-auth-operations";

const PublicRoute = () => {
    const auth = isUserLoggedIn();
    return auth ? <Navigate to={homepageLink}/> : <Outlet/>;
};

export default PublicRoute;