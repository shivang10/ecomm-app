import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const userAddressURL = "/user/profile/get-address/:id";
export const addUserAddressApiUrl = "/user/profile/add-address/:id";
export const getUserAddressInfoApiUrl = "/user/profile/get-address-info/:id/:aid";
export const editUserAddressApiUrl = "/user/profile/update-address/:id/:aid";

export const userAddressService = async () => {
    try {
        return await axiosInterceptor.get(userAddressURL.replace(":id", getProfileId));
    } catch (err) {
        console.error(err);
    }
};

export const getSingleAddressInfoService = async (aid) => {
    try {
        return await axiosInterceptor.get(getUserAddressInfoApiUrl.replace(":id", getProfileId).replace(":aid", aid));
    } catch (err) {
        console.error(err);
    }
};


export const userAddAddressService = async (address) => {
    try {
        return await axiosInterceptor.post(addUserAddressApiUrl.replace(":id", getProfileId), address);
    } catch (err) {
        console.error(err);
    }
};

export const userEditAddressService = async (address, aid) => {
    try {
        return await axiosInterceptor.post(editUserAddressApiUrl.replace(":id", getProfileId).replace(":aid", aid), address);
    } catch (err) {
        console.error(err);
    }
};
