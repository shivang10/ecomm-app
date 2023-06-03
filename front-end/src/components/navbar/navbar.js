import {Link} from "react-router-dom";
import {homepageLink, userLoginLink} from "../../routes/routesLink";
import {RiShoppingCartLine} from "react-icons/ri";
import {FaUser} from "react-icons/fa";
import {BiCategory} from "react-icons/bi";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";
import UserNavbar from "./user-navbar";
import SellerNavbar from "./seller-navbar";

const Navbar = () => {
    const navbarType = "user";

    if (navbarType === "user") {
        return <UserNavbar/>
    } else {
        return <SellerNavbar/>;
    }
};

export default Navbar;