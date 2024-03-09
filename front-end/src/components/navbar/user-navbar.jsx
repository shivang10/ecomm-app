import React from "react";

import {userAccountMenuItems} from "./user-account-menu-items";
import {homepageLink} from "../../routes/routesLink";
import Dropdown from "../dropdown/dropdown";

const UserNavbar = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item button is-info" href={homepageLink}>
                    DMY Store
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        Categories
                    </a>

                    <a className="navbar-item">
                        Best Offers
                    </a>

                    <a className="navbar-item">
                        DMY+
                    </a>
                    <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <Dropdown dropdownOptions={userAccountMenuItems}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;