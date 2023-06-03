import {clearLocalCache, getLocalCache} from "../local-cache/local-cache";
import {localCacheKeys} from "../local-cache/local-cache-keys";
import {store} from "../../redux/store";
import {unsetAuthState} from "../../redux/user-auth-slice";

export const isUserLoggedIn = () => !!getLocalCache(localCacheKeys.token);

export const logoutUser = () => {
    clearLocalCache();
    store.dispatch(unsetAuthState());
    window.location.reload();
}

export const userId = () => isUserLoggedIn() ? "id" : null;