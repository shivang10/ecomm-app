import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const userProfileURL = "/user/profile/info/:id";

export const userProfileInfoService = async () => {
    try {
        return await axiosInterceptor.get(userProfileURL.replace(":id", getProfileId));
    } catch (err) {
        console.log(err);
    }
};
