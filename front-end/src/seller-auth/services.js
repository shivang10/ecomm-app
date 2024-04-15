import {sellerLoginURL, sellerRegisterURL} from "../api-links/seller-apis/auth";
import axiosInterceptor from "../utils/services/axios-interceptor";

export const sellerAuthLoginService = async (sellerLoginData) => await axiosInterceptor.post(sellerLoginURL, sellerLoginData);

export const sellerAuthRegisterService = async (sellerRegisterData) => await axiosInterceptor.post(sellerRegisterURL, sellerRegisterData);
