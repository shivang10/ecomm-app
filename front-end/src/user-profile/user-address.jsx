import React, {useEffect, useState} from "react";

import {BiSolidEditAlt} from "react-icons/bi";
import {MdDelete} from "react-icons/md";

import {userAddressService} from "../account/user-account-service";
import {setSnackBarStatus} from "../action-creators/notification-action-creators";
import {enums} from "../utils/enums/enums";
import splitCamelCaseAndCapitalize from "../utils/helper-functions/camelCaseAndCapitalize";

const excludeAddressKeys = ["_id", "isDeleted", "__v"];

const UserAddress = () => {
    const [userAddress, updateUserAddress] = useState([]);

    useEffect(() => {
        userAddressService()
            .then((res) => {
                const data = res.data.data;
                updateUserAddress(data.address);
            }).catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    }, []);

    const allSavedAddresses = userAddress.map((address) => {
        return <div className="card" key={address._id}>
            <header className="card-header">
                <p className="card-header-title">
                    Address Name
                </p>
                <button className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </header>
            <div className="card-content">
                {Object.keys(address).filter(addressKey => !excludeAddressKeys.includes(addressKey)).map((addressKey) => {
                    return <div className="" key={addressKey}>
                        <span className="has-text-weight-bold">{splitCamelCaseAndCapitalize(addressKey)}: </span>
                        <span>{address[addressKey]}</span>
                    </div>;
                })}
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item yellow-color">Edit <BiSolidEditAlt className="ml-1 is-size-5"/></a>
                <a href="#" className="card-footer-item red-color">Delete <MdDelete className="ml-1 is-size-5"/></a>
            </footer>
        </div>;
    });
    return (<div>
        <div className="text-36px-black-600 flex-hc-vc">Your saved addresses</div>
        <div className="address-cards">
            {allSavedAddresses}
        </div>
    </div>);
};

export default UserAddress;
