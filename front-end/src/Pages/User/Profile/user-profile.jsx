import React, {useEffect, useState} from "react";

import {userProfileInfoService} from "./user-account-service";

const UserProfile = () => {
    const [userInfo, updateUserInfo] = useState({
        "username": "", "email": "", "phoneNumber": ""
    });

    const onChangeHandle = () => {
        return;
    };

    useEffect(() => {
        userProfileInfoService()
            .then((res) => {
                const data = res.data.data;
                updateUserInfo({
                    username: data.username, email: data.email, phoneNumber: data.phoneNumber
                });
            }).catch((err) => {
                console.error(err.response.data.message);
            });
    }, []);

    return (<div className="flex-hc-vc">
        <form className="auth-form">
            <div className="text-36px-black-600 flex-hc-vc">My Details</div>
            <hr className="divider-horizontal"/>
            <label className="text-24px-black-500" htmlFor="username">Username</label>
            <input value={userInfo.username} onChange={onChangeHandle} type="text" placeholder="username"
                name="username"/>

            <label className="text-24px-black-500" htmlFor="email">Email</label>
            <input value={userInfo.email} onChange={onChangeHandle} type="email" placeholder="Email"
                name="Email"/>

            <label className="text-24px-black-500" htmlFor="phoneNumber">Phone Number</label>
            <input value={userInfo.phoneNumber} onChange={onChangeHandle} type="phoneNumber"
                placeholder="Phone Number"
                name="phoneNumber"/>
        </form>
    </div>);
};

export default UserProfile;