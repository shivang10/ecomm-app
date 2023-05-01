import axios from "axios";
import {userLoginURL, userRegisterURL} from "../api-links/api-links";

export const userAuthLoginService = async (userLoginData) => await axios.post(userLoginURL, userLoginData);

export const userAuthRegisterService = async (userRegisterData) => await axios.post(userRegisterURL, userRegisterData);
