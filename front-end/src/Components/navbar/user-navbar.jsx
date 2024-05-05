import React from "react";

import {BiSolidOffer} from "react-icons/bi";
import {TbCategory} from "react-icons/tb";
import {Link} from "react-router-dom";

import {userAccountMenuItems} from "./user-account-menu-items";
import MyDMYStoreLogo from "../../Assets/my-DMY-store.png";
import {homepageLink} from "../../Routes/routesLink";
import Dropdown from "../dropdown/dropdown";

const UserNavbar = () => {
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to={homepageLink}>
                    <img className="py-1 px-2" style={{maxHeight: 60}} src={MyDMYStoreLogo} alt="myDMYStore"/>
                </Link>
                <Link role="button" className="navbar-item" to="">
                    Categories <TbCategory className="ml-1 is-size-5 has-text-link"/>
                </Link>
                <Link role="button" className="navbar-item" to="#">
                    Offers <BiSolidOffer className="ml-1 is-size-5 has-text-link"/>
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <input className="input" type="text" placeholder="Search..."/>
                    </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                    <Link to="" className="navbar-link is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                        My Account
                    </Link>
                    <Dropdown dropdownOptions={userAccountMenuItems}/>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;