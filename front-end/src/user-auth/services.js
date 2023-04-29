import axios from "axios";
import {userLoginURL, userRegisterURL} from "../api-links/api-links";

export const userAuthLoginService = async (userLoginData) => {
    try {
        const resp = await axios.post(userLoginURL, userLoginData);
        return resp.data;
    } catch (err) {
        return err;
    }
};

export const userAuthRegisterService = async (userRegisterData) => {
    try {
        const resp = await axios.post(userRegisterURL, userRegisterData);
        return resp.data;
    } catch (err) {
        return err;
    }
};