import jwtDecode from "jwt-decode";

import {unsetAuthState} from "../../Redux/common/profile-auth-slice";
import {store} from "../../Redux/store";
import {clearLocalCache, getLocalCache} from "../local-cache/local-cache";
import {localCacheKeys} from "../local-cache/local-cache-keys";

export const isUserLoggedIn = !!getLocalCache(localCacheKeys.token);

export const decodeToken = isUserLoggedIn ? jwtDecode(getLocalCache(localCacheKeys.token)) : "";

export const getProfileType = decodeToken?.type || "";

export const getProfileId = decodeToken !== "" ? decodeToken.id : "";

export const logoutProfile = () => {
    clearLocalCache();
    store.dispatch(unsetAuthState());
    window.location.reload();
};

export const getAuthState = {
    isAuthenticated: isUserLoggedIn,
    id: decodeToken?.id,
    email: decodeToken?.email,
    type: decodeToken?.type,
};
