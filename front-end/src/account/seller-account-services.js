import axios from "axios";
import jwt from "jwt-decode";

import { sellerProfileURL, sellerAddressURL } from "../api-links/api-links";
import { enums } from "../utils/enums/enums";
import { getLocalCache } from "../utils/local-cache/local-cache";

const token = getLocalCache(enums.user.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded.id;
}
export const sellerProfileInfoService = async () => axios.get(sellerProfileURL.replace("/:id", `/${id}`), { headers: { Authorization: `Bearer ${token}` } });

export const sellerAddressService = async () => axios.get(sellerAddressURL.replace("/:id", `/${id}`), { headers: { Authorization: `Bearer ${token}` } });
