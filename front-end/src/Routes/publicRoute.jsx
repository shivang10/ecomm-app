import React from "react";

import {Navigate, Outlet} from "react-router-dom";

import {homepageLink} from "./routesLink";
import {isUserLoggedIn} from "../Utils/auth/profile-auth-operations";

const PublicRoute = () => {
    return isUserLoggedIn ? <Navigate to={homepageLink}/> : <Outlet/>;
};

export default PublicRoute;