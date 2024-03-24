import {configureStore} from "@reduxjs/toolkit";

import snackbarReducers from "./snackbar-reducers";
import authReducer from "./user-auth-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbarState: snackbarReducers
    }
});
