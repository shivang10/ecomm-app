import React, { useState, useEffect } from "react";

import { userAddressService } from "../account/user-account-service";

const UserAddress = () => {
    const [userAddress, updateUserAddress] = useState([]);

    useEffect(() => {
        userAddressService()
            .then((res) => {
                const data = res.data.data;
                updateUserAddress(data.address);
                console.log(userAddress);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    const allSavedAddresses = userAddress.map((address) => {
        return <div className="address-card" key={address._id}>
            <div>
                <span className="text-24px-black-600">Unit Number:</span> <span className="text-24px-black-500">{address.unitNumber}</span>
            </div>
            <div>
                <span className="text-24px-black-600">Street No:</span>  <span className="text-24px-black-500">{address.streetNo}</span>
            </div>
            <div>
                <span className="text-24px-black-600">Locality:</span> <span className="text-24px-black-500">{address.locality}</span>
            </div>
            <div>
                <span className="text-24px-black-600">Landmark:</span>  <span className="text-24px-black-500">{address.landmark}</span>
            </div>
            <div>
                <span className="text-24px-black-600">City:</span> <span className="text-24px-black-500">{address.city}</span>
            </div>
            <div>
                <span className="text-24px-black-600">State:</span>  <span className="text-24px-black-500">{address.state}</span>
            </div>
            <div>
                <span className="text-24px-black-600">PinCode:</span>  <span className="text-24px-black-500">{address.pinCode}</span>
            </div>
            <div>
                <span className="text-24px-black-600">Country:</span>  <span className="text-24px-black-500">{address.country}</span>
            </div>

        </div>;
    });
    return (
        <div>
            <div className="text-36px-black-600 flex-hc-vc">Your saved addresses</div>
            <div className="address-page">
                {allSavedAddresses}{allSavedAddresses}{allSavedAddresses}{allSavedAddresses}{allSavedAddresses}{allSavedAddresses}
            </div>
        </div>
    );
};

export default UserAddress;