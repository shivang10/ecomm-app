import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./common/profile-auth-slice";
import snackbarReducers from "./common/snackbar-slice";
import {getLocalCache} from "../utils/local-cache/local-cache";
import {localCacheKeys} from "../utils/local-cache/local-cache-keys";

const preloadedState = {
    auth: {
        isAuthenticated: !!getLocalCache(localCacheKeys.token) ?? false
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbarState: snackbarReducers
    },
    preloadedState
});
