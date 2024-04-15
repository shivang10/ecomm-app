import jwt from "jwt-decode";

import {sellerAddressURL, sellerProfileURL} from "../api-links/seller-apis/profile";
import {enums} from "../utils/enums/enums";
import {getLocalCache} from "../utils/local-cache/local-cache";
import axiosInterceptor from "../utils/services/axios-interceptor";

const token = getLocalCache(enums.user.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded.id;
}
export const sellerProfileInfoService = async () => axiosInterceptor.get(sellerProfileURL.replace("/:id", `/${id}`));

export const sellerAddressService = async () => axiosInterceptor.get(sellerAddressURL.replace("/:id", `/${id}`));
