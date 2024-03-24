import axios from "axios";
import jwt from "jwt-decode";

import {userAddressURL, userProfileURL} from "../api-links/api-links";
import {enums} from "../utils/enums/enums";
import {getLocalCache} from "../utils/local-cache/local-cache";

const token = getLocalCache(enums.common.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded.id;
}

export const userProfileInfoService = async () => axios.get(userProfileURL.replace("/:id", `/${id}`));

export const userAddressService = async () => axios.get(userAddressURL.replace("/:id", `/${id}`));
