import {Link} from "react-router-dom";
import {homepageLink, userLoginLink} from "../../routes/routesLink";
import {RiShoppingCartLine} from "react-icons/ri";
import {FaUser} from "react-icons/fa";
import {BiCategory} from "react-icons/bi";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";

const Navbar = () => {
    return (<div className="navbar">
        <div className="navbar__top">
            <div>
                <Link to={homepageLink}>
                    <img className="navbar__logo" src={MyDMYStoreLogo} alt="myDMYStore"/> </Link>
            </div>
            <div>Search</div>
            <div className="btn-22px-black"><RiShoppingCartLine/></div>
            <div className="navbar-account">
                <Link className="btn-22px-black flex-hc-vc" to={userLoginLink}>
                    <FaUser className="icon-right-4px"/> Account</Link>
            </div>
        </div>
        <div className="navbar__bottom">
            <div className="btn-22px-black flex-vc"><BiCategory className="icon-right-4px"/> Categories</div>
            <div className="flex-hc-vc">
                <div className="btn-22px-black">Best Offers</div>
                <div className="btn-22px-black">DMY+</div>
            </div>
        </div>
    </div>);
};

export default Navbar;