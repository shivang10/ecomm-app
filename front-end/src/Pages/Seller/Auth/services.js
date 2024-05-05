import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const sellerLoginURL = "/seller-login";
export const sellerRegisterURL = "/seller-register";

export const sellerAuthLoginService = async (sellerLoginData) => await axiosInterceptor.post(sellerLoginURL, sellerLoginData);

export const sellerAuthRegisterService = async (sellerRegisterData) => await axiosInterceptor.post(sellerRegisterURL, sellerRegisterData);
