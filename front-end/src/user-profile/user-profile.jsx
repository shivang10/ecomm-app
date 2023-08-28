import React, { useState, useEffect } from "react";

import { userProfileInfoService } from "../account/user-account-service";

const UserProfile = () => {
    const [userInfo, updateUserInfo] = useState({
        "username": "",
        "email": "",
        "phoneNumber": ""
    });

    useEffect(() => {
        userProfileInfoService()
            .then((res) => {
                const data = res.data.data;
                updateUserInfo({
                    username: data.username,
                    email: data.username,
                    phoneNumber: data.phoneNumber
                });
            }).catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <div>
            {userInfo.username}
        </div>
    );
};

export default UserProfile;