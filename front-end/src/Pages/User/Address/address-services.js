import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const userAddressURL = "/user/profile/get-address/:id";
export const addUserAddressApiUrl = "/user/profile/add-address/:id";
export const getUserAddressInfoApiUrl = "/user/profile/get-address-info/:id/:aid";
export const editUserAddressApiUrl = "/user/profile/update-address/:id/:aid";

export const userAddressService = async () => await axiosInterceptor.get(userAddressURL.replace(":id", getProfileId));

export const getSingleAddressInfoService = async (aid) => await axiosInterceptor.get(getUserAddressInfoApiUrl.replace(":id", getProfileId).replace(":aid", aid));


export const userAddAddressService = async (address) => await axiosInterceptor.post(addUserAddressApiUrl.replace(":id", getProfileId), address);

export const userEditAddressService = async (address, aid) => await axiosInterceptor.post(editUserAddressApiUrl.replace(":id", getProfileId).replace(":aid", aid), address);