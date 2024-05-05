import {setSnackBarState} from "../Redux/common/snackbar-slice";
import {store} from "../Redux/store";
import {enums} from "../Utils/enums/enums";

export const setSnackBarStatus = (type, message) => {
    store.dispatch(setSnackBarState({type, message}));
    setTimeout(() => {
        store.dispatch(setSnackBarState({type: enums.snackBar.stale, message: ""}));
    }, 2500);
};
