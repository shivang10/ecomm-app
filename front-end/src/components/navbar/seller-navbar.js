import {Link} from "react-router-dom";
import {homepageLink, userLoginLink} from "../../routes/routesLink";
import {FaUser} from "react-icons/fa";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";

const SellerNavbar = () => {
    return (<div className="sellerNavbar">
        <div className="sellerNavbar__top">
            <div>
                <Link to={homepageLink}>
                    <img className="userNavbar__logo" src={MyDMYStoreLogo} alt="myDMYStore"/> </Link>
            </div>
            <div className="sellerNavbar-account">
                <Link className="btn-22px-black flex-hc-vc" to={userLoginLink}>
                    <FaUser className="icon-right-4px"/> Account</Link>
            </div>
        </div>
    </div>);
};

export default SellerNavbar;