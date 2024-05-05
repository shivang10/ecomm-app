import React, {useEffect} from "react";

import {useDispatch} from "react-redux";

import CommonNavbar from "./common-navbar";
import SellerNavbar from "./seller-navbar";
import UserNavbar from "./user-navbar";
import {setAuthState} from "../../Redux/common/profile-auth-slice";
import {getAuthState, getProfileType} from "../../Utils/auth/profile-auth-operations";
import {enums} from "../../Utils/enums/enums";

const Navbar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthState(getAuthState));
    }, []);

    if (getProfileType === enums.user.account) {
        return <UserNavbar/>;
    } else if (getProfileType === enums.seller.account) {
        return <SellerNavbar/>;
    } else {
        return <CommonNavbar/>;
    }
};

export default Navbar;
