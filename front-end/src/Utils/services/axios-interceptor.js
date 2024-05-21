import axios from "axios";

import {setSnackBarStatus} from "../../Action-Creators/notification-action-creators";
import {enums} from "../enums/enums";
import {getLocalCache} from "../local-cache/local-cache";
import {localCacheKeys} from "../local-cache/local-cache-keys";

const baseUrl = "http://localhost:5000";

const axiosInterceptor = axios.create({
    baseURL: `${baseUrl}`,
});

axiosInterceptor.interceptors.request.use(
    (config) => {
        const token = getLocalCache(localCacheKeys.token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        setSnackBarStatus(enums.snackBar.danger, error.response);
        return Promise.reject(error);
    }
);

axiosInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const message = error.message;
        setSnackBarStatus(enums.snackBar.danger, message);
        return Promise.reject(error);
    }
);

export default axiosInterceptor;
