import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const userLoginURL = "/user/auth/login";
export const userRegisterURL = "/user-register";

export const userAuthLoginService = async (userLoginData) => await axiosInterceptor.post(userLoginURL, userLoginData);

export const userAuthRegisterService = async (userRegisterData) => await axiosInterceptor.post(userRegisterURL, userRegisterData);
