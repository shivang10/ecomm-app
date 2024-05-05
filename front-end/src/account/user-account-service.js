import jwt from "jwt-decode";

import {
    addUserAddressApiUrl,
    editUserAddressApiUrl,
    getUserAddressInfoApiUrl,
    userAddressURL,
    userProfileURL
} from "../api-links/user-apis/profile";
import {enums} from "../utils/enums/enums";
import {getLocalCache} from "../utils/local-cache/local-cache";
import axiosInterceptor from "../utils/services/axios-interceptor";

const token = getLocalCache(enums.common.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded.id;
}

export const userProfileInfoService = async () => {
    try {
        return await axiosInterceptor.get(userProfileURL.replace("/:id", `/${id}`));
    } catch (err) {
        console.log(err);
    }
};
export const userAddressService = async () => {
    try {
        return await axiosInterceptor.get(userAddressURL.replace("/:id", `/${id}`));
    } catch (err) {
        console.error(err);
    }
};

export const getSingleAddressInfoService = async (aid) => {
    try {
        return await axiosInterceptor.get(getUserAddressInfoApiUrl.replace(":id", id).replace(":aid", aid));
    } catch (err) {
        console.error(err);
    }
};


export const userAddAddressService = async (address) => {
    try {
        return await axiosInterceptor.post(addUserAddressApiUrl.replace(":id", id), address);
    } catch (err) {
        console.error(err);
    }
};

export const userEditAddressService = async (address, aid) => {
    try {
        return await axiosInterceptor.post(editUserAddressApiUrl.replace(":id", id).replace(":aid", aid), address);
    } catch (err) {
        console.error(err);
    }
};