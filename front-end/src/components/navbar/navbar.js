import UserNavbar from "./user-navbar";
import SellerNavbar from "./seller-navbar";
import jwt from "jwt-decode";
import {getLocalCache} from "../../utils/local-cache/local-cache";
import {enums} from "../../utils/enums/enums";
import CommonNavbar from "./common-navbar";

const Navbar = () => {
    const token = getLocalCache(enums.user.token);
    let navbarType = enums.navbar.common;
    if (token) {
        const decoded = jwt(token);
        navbarType = decoded["type"];
    }

    if (navbarType === enums.navbar.user) {
        return <UserNavbar/>
    } else if (navbarType === enums.navbar.seller) {
        return <SellerNavbar/>;
    } else {
        return <CommonNavbar/>;
    }
};

export default Navbar;