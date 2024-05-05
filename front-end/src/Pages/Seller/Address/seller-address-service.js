import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const sellerAddressURL = "/seller/address/:id";
export const sellerAddressService = async () => axiosInterceptor.get(sellerAddressURL.replace(":id", getProfileId));
