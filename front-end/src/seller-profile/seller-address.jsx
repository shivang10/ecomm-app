import React, {useEffect, useState} from "react";

import {sellerAddressService} from "../account/seller-account-services";
import {setSnackBarStatus} from "../action-creators/notification-action-creators";
import {enums} from "../utils/enums/enums";

const SellerAddress = () => {
    const [sellerAddress, updateSellerAddress] = useState([]);

    useEffect(() => {
        sellerAddressService()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
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
