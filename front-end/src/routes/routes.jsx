import React from "react";
import {lazy, Suspense} from "react";

import {Route, Routes} from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import {
    homepageLink,
    userLoginLink,
    userRegisterLink,
    sellerLoginLink,
    sellerRegisterLink,
    accountLink,
    sellerProfileLink,
    sellerAddressLink,
    userProfileLink,
    userAddressLink
} from "./routesLink";
import SellerAddress from "../seller-profile/seller-address";
import SellerInfo from "../seller-profile/seller-info";
import UserAddress from "../user-profile/user-address";
import UserProfile from "../user-profile/user-profile";

const Homepage = lazy(() => import("../homepage/homepage"));
const UserRegister = lazy(() => import("../user-auth/user-register"));
const UserLogin = lazy(() => import("../user-auth/user-login"));
const SellerRegister = lazy(() => import("../seller-auth/seller-register"));
const SellerLogin = lazy(() => import("../seller-auth/seller-login"));
const MyAccount = lazy(() => import("../account/account"));

const PageRoutes = () => {
    return (
        <Suspense fallback={<div>...</div>}>
            <Routes>
                <Route path={homepageLink} element={<PrivateRoute/>}>
                    <Route exact path={homepageLink} element={<Homepage/>}/>
                    <Route exact path={accountLink} element={<MyAccount/>}/>
                    <Route exact path={sellerProfileLink} element={<SellerInfo/>}/>
                    <Route exact path={sellerAddressLink} element={<SellerAddress/>}/>
                    <Route exact path={userProfileLink} element={<UserProfile />} />
                    <Route exact path={userAddressLink} element={<UserAddress />} />
                </Route>
                <Route path={homepageLink} element={<PublicRoute/>}>
                    <Route exact path={homepageLink} element={<Homepage/>}/>
                    <Route exact path={userLoginLink} element={<UserLogin/>}/>
                    <Route exact path={userRegisterLink} element={<UserRegister/>}/>
                    <Route exact path={sellerLoginLink} element={<SellerLogin/>}/>
                    <Route exact path={sellerRegisterLink} element={<SellerRegister/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};
export default PageRoutes;
