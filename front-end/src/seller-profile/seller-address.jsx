import React, {useEffect, useState} from "react";

import {sellerAddressService} from "../account/seller-account-services";

const SellerAddress = () => {
    const [sellerAddress, updateSellerAddress] = useState([]);

    useEffect(() => {
        sellerAddressService()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err.response.data.message);
            });

    }, []);

    return (
        <div>
            My address
            {sellerAddress.map((address) => {
                return {address};
            })}
        </div>
    );
};
export default SellerAddress;
