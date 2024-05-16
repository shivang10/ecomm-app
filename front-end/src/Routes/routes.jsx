import React, {lazy, Suspense} from "react";

import {Route, Routes} from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import {
    accountLink,
    addNewAddress,
    changePasswordLink,
    editUserAddress,
    homepageLink,
    sellerAddressLink,
    sellerLoginLink,
    sellerProfileLink,
    sellerRegisterLink,
    userAddressLink,
    userLoginLink,
    userProfileLink,
    userRegisterLink
} from "./routesLink";
import SellerAddress from "../Pages/Seller/Address/seller-address";
import SellerInfo from "../Pages/Seller/Profile/seller-info";
import UserAddress from "../Pages/User/Address/user-address";
import UserProfile from "../Pages/User/Profile/user-profile";

const Homepage = lazy(() => import("../Pages/Common/homepage/homepage"));
const UserRegister = lazy(() => import("../Pages/User/Auth/user-register"));
const UserLogin = lazy(() => import("../Pages/User/Auth/user-login"));
const SellerRegister = lazy(() => import("../Pages/Seller/Auth/seller-register"));
const SellerLogin = lazy(() => import("../Pages/Seller/Auth/seller-login"));
const MyAccount = lazy(() => import("../Pages/Common/account/account"));
const AddNewAddress = lazy(() => import("../Pages/User/Address/add-new-address"));
const EditUserAddress = lazy(() => import("../Pages/User/Address/edit-user-address"));
const ChangeUserPassword = lazy(() => import("../Pages/User/Auth/change-password"));

const PageRoutes = () => {
    return (<Suspense fallback={<div>...</div>}>
        <Routes>
            <Route exact path={homepageLink} element={<Homepage/>}/>
            <Route element={<PrivateRoute/>}>
                <Route exact path={accountLink} element={<MyAccount/>}/>
                <Route exact path={sellerProfileLink} element={<SellerInfo/>}/>
                <Route exact path={sellerAddressLink} element={<SellerAddress/>}/>
                <Route exact path={userProfileLink} element={<UserProfile/>}/>
                <Route exact path={userAddressLink} element={<UserAddress/>}/>
                <Route exact path={addNewAddress} element={<AddNewAddress/>}/>
                <Route exact path={editUserAddress} element={<EditUserAddress/>}/>
                <Route exact path={changePasswordLink} element={<ChangeUserPassword/>}/>
            </Route>
            <Route path={homepageLink} element={<PublicRoute/>}>
                <Route exact path={userLoginLink} element={<UserLogin/>}/>
                <Route exact path={userRegisterLink} element={<UserRegister/>}/>
                <Route exact path={sellerLoginLink} element={<SellerLogin/>}/>
                <Route exact path={sellerRegisterLink} element={<SellerRegister/>}/>
            </Route>
        </Routes>
    </Suspense>);
};
export default PageRoutes;
