import React, {useEffect} from "react";

import {useDispatch} from "react-redux";

import CommonNavbar from "./common-navbar";
import SellerNavbar from "./seller-navbar";
import UserNavbar from "./user-navbar";
import {setAuthState} from "../../redux/common/profile-auth-slice";
import {getAuthState, getProfileType} from "../../utils/auth/profile-auth-operations";
import {enums} from "../../utils/enums/enums";

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
