import {userLoginURL, userRegisterURL} from "../api-links/user-apis/auth";
import axiosInterceptor from "../utils/services/axios-interceptor";

export const userAuthLoginService = async (userLoginData) => await axiosInterceptor.post(userLoginURL, userLoginData);

export const userAuthRegisterService = async (userRegisterData) => await axiosInterceptor.post(userRegisterURL, userRegisterData);
