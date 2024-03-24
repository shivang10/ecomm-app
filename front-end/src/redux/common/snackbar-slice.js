import {createSlice} from "@reduxjs/toolkit";

import {enums} from "../../utils/enums/enums";

const initialSnackBarState = {
    isSuccess: false,
    isDanger: false,
    isWarning: false,
    isStale: true,
    message: ""
};

export const snackBarSlice = createSlice({
    name: "snackbar",
    initialState: initialSnackBarState,
    reducers: {
        setSnackBarState(state, action) {
            const {type, message} = action.payload;
            state.isSuccess = false;
            state.isWarning = false;
            state.isDanger = false;
            state.isStale = false;
            state.message = message;

            if (type === enums.snackBar.success) {
                state.isSuccess = true;
            } else if (type === enums.snackBar.error) {
                state.isWarning = true;
            } else if (type === enums.snackBar.danger) {
                state.isDanger = true;
            } else {
                state.isStale = true;
                state.message = "";
            }
        }
    }
});

export const {setSnackBarState} = snackBarSlice.actions;

export default snackBarSlice.reducer;
