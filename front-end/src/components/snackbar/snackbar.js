import React from "react";
import {BsExclamationTriangleFill, BsFillCheckCircleFill, BsFillExclamationCircleFill} from "react-icons/bs";

const Snackbar = ({type, message = ""}) => {
    if (type === "") {
        return <></>;
    }

    return (
        <div className={`snackBar snackBar__${type} flex-hc-vc`}>
            {type === "error" ?
                <BsExclamationTriangleFill className="icon-right-6px"/>
                : type === "success" ?
                <BsFillCheckCircleFill className="icon-right-6px" /> :
                    <BsFillExclamationCircleFill className="icon-right-6px"/>}
            <span> {message}</span>
        </div>
    );
};

export default Snackbar;
