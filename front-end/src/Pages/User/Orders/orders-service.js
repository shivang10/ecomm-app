import {getProfileId} from "../../../Utils/auth/profile-auth-operations";
import axiosInterceptor from "../../../Utils/services/axios-interceptor";

export const allOrdersURL = "/user/orders/get-orders/:id";
export const singleOrderInfoURL = "/user/orders/order-info/:id/:oid";
export const addProductReviewURL = "/user/orders/add-product-review/:id/:oid/:pid";
export const updateProductReviewURL = "/user/orders/update-product-review/:id/:rid";
export const cancelWholeOrderURL = "/user/orders/cancel-whole-orders/:id/:oid";
export const cancelSingleOrderItemURL = "/user/orders/cancel-order-item/:id/:oid/:pid";

export const getOrdersService = async () => await axiosInterceptor.get(allOrdersURL.replace(":id", getProfileId));

export const singleOrderInfoService = async (orderId) => await axiosInterceptor.get(singleOrderInfoURL.replace(":id", getProfileId).replace(":oid", orderId));

export const addProductReviewService = async (orderId, productId, reviewData) => await axiosInterceptor.post(addProductReviewURL.replace(":id", getProfileId).replace(":oid", orderId).replace(":pid", productId), reviewData);

export const updateProductReviewService = async (orderId, reviewId, reviewData) => await axiosInterceptor.post(updateProductReviewURL.replace(":id", getProfileId).replace(":rid", reviewId), reviewData);

export const cancelWholeOrderService = async (orderId) => await axiosInterceptor.get(cancelWholeOrderURL.replace(":id", getProfileId).replace(":oid", orderId));

export const cancelSingleOrderItemService = async (orderId, productId) => await axiosInterceptor.get(cancelSingleOrderItemURL.replace(":id", getProfileId).replace(":oid", orderId).replace(":pid", productId));
