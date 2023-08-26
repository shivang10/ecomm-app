import React from "react";

import jwt from "jwt-decode";

import CommonNavbar from "./common-navbar";
import SellerNavbar from "./seller-navbar";
import UserNavbar from "./user-navbar";
import {enums} from "../../utils/enums/enums";
import {getLocalCache} from "../../utils/local-cache/local-cache";

const Navbar = () => {
    const token = getLocalCache(enums.user.token);
    let navbarType = enums.navbar.common;
    if (token) {
        const decoded = jwt(token);
        navbarType = decoded["type"];
    }

    if (navbarType === enums.user.account) {
        return <UserNavbar/>;
    } else if (navbarType === enums.seller.account) {
        return <SellerNavbar/>;
    } else {
        return <CommonNavbar/>;
    }
};

export default Navbar;