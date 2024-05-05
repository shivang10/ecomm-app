import React from "react";

import {useSelector} from "react-redux";

const Snackbar = () => {
    const {isSuccess, isWarn, isDanger, isStale, message} = useSelector((state) => state.snackbarState);
    let snackBarClassName = "";

    if (isSuccess) {
        snackBarClassName = "is-success";
    }

    if (isWarn) {
        snackBarClassName = "is-warning";
    }

    if (isDanger) {
        snackBarClassName = "is-danger";
    }

    if (isStale) {
        return null;
    }

    return (
        <div className="snackBar">
            <div className={`notification ${snackBarClassName} is-size-6 has-text-weight-semibold`}>
                {message}
            </div>
        </div>
    );
};

export default Snackbar;
