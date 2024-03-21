import React from "react";

import {BiSolidOffer} from "react-icons/bi";
import {TbCategory} from "react-icons/tb";

import {userAccountMenuItems} from "./user-account-menu-items";
import MyDMYStoreLogo from "../../assets/my-DMY-store.png";
import {homepageLink} from "../../routes/routesLink";
import Dropdown from "../dropdown/dropdown";

const UserNavbar = () => {
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href={homepageLink}>
                    <img className="py-1 px-2" style={{maxHeight: 60}} src={MyDMYStoreLogo} alt="myDMYStore"/>
                </a>

                <a role="button" className="navbar-item">
                    Categories <TbCategory className="ml-1 is-size-5 has-text-link"/>
                </a>

                <a role="button" className="navbar-item">
                    Offers <BiSolidOffer className="ml-1 is-size-5 has-text-link"/>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <input className="input" type="text" placeholder="Search..."/>
                    </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                        My Account
                    </a>
                    <Dropdown dropdownOptions={userAccountMenuItems}/>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;