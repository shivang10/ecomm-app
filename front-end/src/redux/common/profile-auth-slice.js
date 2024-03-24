import {createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
    id: null,
    email: null,
    type: null,
    isAuthenticated: false
};

export const profileAuthSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setAuthState: (state, action) => {
            const {id, email, type, isAuthenticated} = action.payload;
            state.id = id;
            state.email = email;
            state.type = type;
            state.isAuthenticated = isAuthenticated;
        },
        unsetAuthState: (state) => {
            state.id = null;
            state.email = null;
            state.type = null;
            state.isAuthenticated = false;
        }
    }
});

export const {setAuthState, unsetAuthState} = profileAuthSlice.actions;

export default profileAuthSlice.reducer;
