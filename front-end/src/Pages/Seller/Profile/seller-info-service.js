import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const sellerProfileURL = "/seller/info/:id";

export const sellerProfileInfoService = async () => axiosInterceptor.get(sellerProfileURL.replace(":id", getProfileId));
