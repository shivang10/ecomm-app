import UserNavbar from "./user-navbar";
import SellerNavbar from "./seller-navbar";
import jwt from "jwt-decode";
import {getLocalCache} from "../../utils/local-cache/local-cache";
import {enums} from "../../utils/enums/enums";

const Navbar = () => {
    const token = getLocalCache(enums.user.token);

    const decoded = jwt(token);
    const navbarType = decoded["type"];

    if (navbarType === "user") {
        return <UserNavbar/>
    } else {
        return <SellerNavbar/>;
    }
};

export default Navbar;