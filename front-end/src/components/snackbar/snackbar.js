import React from "react";
import {BsExclamationTriangleFill, BsFillCheckCircleFill, BsFillExclamationCircleFill} from "react-icons/bs";
import {enums} from "../../utils/enums/enums";

const Snackbar = ({type, message = ""}) => {
    if (type === "") {
        return <></>;
    }

    return (
        <div className={`snackBar snackBar__${type} flex-hc-vc`}>
            {type === enums.snackBar.error ?
                <BsExclamationTriangleFill className="icon-right-6px"/>
                : type === enums.snackBar.success ?
                    <BsFillCheckCircleFill className="icon-right-6px"/> :
                    <BsFillExclamationCircleFill className="icon-right-6px"/>}
            <span> {message}</span>
        </div>
    );
};

export default Snackbar;
