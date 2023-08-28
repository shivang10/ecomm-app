import axios from "axios";
import jwt from "jwt-decode";

import { userProfileURL, userAddressURL } from "../api-links/api-links";
import { enums } from "../utils/enums/enums";
import { getLocalCache } from "../utils/local-cache/local-cache";

const token = getLocalCache(enums.user.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded.id;
}

export const userProfileInfoService = async () => axios.get(userProfileURL.replace("/:id", `/${id}`), { headers: { Authorization: `Bearer ${token}` } });

export const userAddressService = async () => axios.get(userAddressURL.replace("/:id", `/${id}`), { headers: { Authorization: `Bearer ${token}` } });
