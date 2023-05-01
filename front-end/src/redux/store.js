import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./user-auth-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
