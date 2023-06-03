import {Link} from "react-router-dom";
import {homepageLink} from "../../routes/routesLink";
import {RiShoppingCartLine} from "react-icons/ri";
import {BiCategory} from "react-icons/bi";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";
import Dropdown from "../dropdown/dropdown";
import {userAccountMenuItems} from "./user-account-menu-items";

const UserNavbar = () => {
    return (<div className="userNavbar">
        <div className="userNavbar__top">
            <div>
                <Link to={homepageLink}>
                    <img className="userNavbar__logo" src={MyDMYStoreLogo} alt="myDMYStore"/> </Link>
            </div>
            <div>Search</div>
            <div className="btn-22px-black flex-hc-vc"><RiShoppingCartLine/></div>
            <div className="userNavbar-account">
                <Dropdown dropdownOptions={userAccountMenuItems}/>
            </div>
        </div>
        <div className="userNavbar__bottom">
            <div className="btn-22px-black flex-vc"><BiCategory className="icon-right-4px"/> Categories</div>
            <div className="flex-hc-vc">
                <div className="btn-22px-black">Best Offers</div>
                <div className="btn-22px-black">DMY+</div>
            </div>
        </div>
    </div>);
};

export default UserNavbar;