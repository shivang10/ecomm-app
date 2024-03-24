import {setSnackBarState} from "../redux/snackbar-reducers";
import {store} from "../redux/store";
import {enums} from "../utils/enums/enums";

export const setSnackBarStatus = (type, message) => {
    store.dispatch(setSnackBarState({type, message}));
    setTimeout(() => {
        store.dispatch(setSnackBarState({type: enums.snackBar.stale, message: ""}));
    }, 2500);
};
