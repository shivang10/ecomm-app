import React from "react";

import { Link } from "react-router-dom";

import { sellerAccountMenuItems } from "./seller-account-menu-items";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";
import { homepageLink } from "../../routes/routesLink";
import Dropdown from "../dropdown/dropdown";

const SellerNavbar = () => {
    return (
        <div className="sellerNavbar">
            <div className="sellerNavbar__top">
                <div>
                    <Link to={homepageLink}>
                        <img className="userNavbar__logo" src={MyDMYStoreLogo} alt="myDMYStore" /> </Link>
                </div>
                <div className="sellerNavbar-account">
                    <Dropdown dropdownOptions={sellerAccountMenuItems} />
                </div>
            </div>
        </div>
    );
};

export default SellerNavbar;