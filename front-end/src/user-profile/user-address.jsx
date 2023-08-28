import React, { useState, useEffect } from "react";

import { userAddressService } from "../account/user-account-service";

const UserAddress = () => {
    const [userAddress, updateUserAddress] = useState([]);

    useEffect(() => {
        userAddressService()
            .then((res) => {
                const data = res.data.data;
                updateUserAddress(data);
                console.log(userAddress);
            }).catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <div>
            Address
        </div>
    );
};

export default UserAddress;