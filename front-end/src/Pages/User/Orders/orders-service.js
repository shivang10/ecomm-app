import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const allOrders = "/user/orders/get-orders/:id";
export const singleOrderInfo = "/user/orders/order-info/:id/:oid";
export const addProductReview = "/user/orders/add-product-review/:id/:oid/:pid";
export const updateProductReview = "/user/orders/update-product-review/:id/:rid";

export const getOrdersService = async () => await axiosInterceptor.get(allOrders.replace(":id", getProfileId));

export const singleOrderInfoService = async (orderId) => await axiosInterceptor.get(singleOrderInfo.replace(":id", getProfileId).replace(":oid", orderId));

export const addProductReviewService = async (orderId, productId, reviewData) => await axiosInterceptor.post(addProductReview.replace(":id", getProfileId).replace(":oid", orderId).replace(":pid", productId), reviewData);

export const updateProductReviewService = async (orderId, reviewId, reviewData) => await axiosInterceptor.post(updateProductReview.replace(":id", getProfileId).replace(":rid", reviewId), reviewData);
