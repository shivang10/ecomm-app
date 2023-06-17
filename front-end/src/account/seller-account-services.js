import axios from "axios";

import {sellerProfileURL, sellerAddressURL} from "../api-links/api-links";
import {getLocalCache} from "../utils/local-cache/local-cache";
import {enums} from "../utils/enums/enums";
import jwt from "jwt-decode";

const token = getLocalCache(enums.user.token);
let id;
if (token) {
    const decoded = jwt(token);
    id = decoded["id"];
}
export const sellerProfileInfoService = async () => await axios.get(sellerProfileURL.replace("/:id", `/${id}`), {headers: {"Authorization": `Bearer ${token}`}})

export const sellerAddressService = async () => await axios.get(sellerAddressURL.replace("/:id", `/${id}`), {headers: {"Authorization": `Bearer ${token}`}})