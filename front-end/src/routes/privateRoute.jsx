import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { userLoginLink } from "./routesLink";
import { isUserLoggedIn } from "../utils/auth/user-auth-operations";

const PrivateRoute = () => {
    const auth = isUserLoggedIn();
    return auth ? <Outlet /> : <Navigate to={userLoginLink} />;
};

export default PrivateRoute;