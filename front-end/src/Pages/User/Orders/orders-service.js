import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const allOrders = "/user/orders/get-orders/:id";
export const singleOrderInfo = "/user/orders/order-info/:id/:oid";

export const getOrdersService = async () => {
    try {
        return await axiosInterceptor.get(allOrders.replace(":id", getProfileId));
    } catch (err) {
        console.error(err);
    }
};

export const singleOrderInfoService = async (orderId) => {
    try {
        return await axiosInterceptor.get(singleOrderInfo.replace(":id", getProfileId).replace(":oid", orderId));
    } catch (err) {
        console.error(err);
    }
};
