import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const userLoginURL = "/user/auth/login";
export const userRegisterURL = "/user/auth/register";
export const userChangePasswordURL = "/user/auth/change-password/:id";

export const userAuthLoginService = async (userLoginData) => await axiosInterceptor.post(userLoginURL, userLoginData);

export const userAuthRegisterService = async (userRegisterData) => await axiosInterceptor.post(userRegisterURL, userRegisterData);

export const userAuthChangePasswordService = async (passwordData) => await axiosInterceptor.post(userChangePasswordURL.replace(":id", getProfileId), passwordData);
