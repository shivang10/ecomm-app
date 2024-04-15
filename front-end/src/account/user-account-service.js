import jwt from "jwt-decode";

import {userAddressURL, userProfileURL} from "../api-links/user-apis/profile";
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
