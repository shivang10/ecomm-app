import React from "react";

import {sellerAccountMenuItems} from "./seller-account-menu-items";
import MyDMYStoreLogo from "../../Assets/my-DMY-store.png";
import {homepageLink} from "../../Routes/routesLink";
import Dropdown from "../dropdown/dropdown";

const SellerNavbar = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href={homepageLink}>
                    <img src={MyDMYStoreLogo} alt="myDMYStore" width="112" height="100"/>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <Dropdown dropdownOptions={sellerAccountMenuItems}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SellerNavbar;