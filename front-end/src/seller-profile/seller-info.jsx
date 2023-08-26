import React, { useState, useEffect } from "react";

import { sellerProfileInfoService } from "../account/seller-account-services";

const SellerInfo = () => {
    const [sellerInfo, updateSellerInfo] = useState({
        "username": "", "email": "", "phoneNumber": ""
    });

    useEffect(() => {
        sellerProfileInfoService()
            .then((res) => {
                const data = res.data.data;
                updateSellerInfo({
                    username: data.username, email: data.email, phoneNumber: data.phoneNumber
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (<div>
        <div>{sellerInfo.email}</div>
        <div>{sellerInfo.phoneNumber}</div>
        <div>{sellerInfo.phoneNumber}</div>
    </div>);
};

export default SellerInfo;