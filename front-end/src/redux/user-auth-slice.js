import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    userId: null
};

export const userAuthSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setAuthState: (state, action) => {
            state.userId = action.payload;
        },
        unsetAuthState: (state) => {
            state.userId = null;
        }
    }
});

export const { setAuthState, unsetAuthState } = userAuthSlice.actions;

export default userAuthSlice.reducer;