import axios from "axios";

import { sellerLoginURL, sellerRegisterURL } from "../api-links/api-links";

export const sellerAuthLoginService = async (sellerLoginData) => await axios.post(sellerLoginURL, sellerLoginData);

export const sellerAuthRegisterService = async (sellerRegisterData) => await axios.post(sellerRegisterURL, sellerRegisterData);
