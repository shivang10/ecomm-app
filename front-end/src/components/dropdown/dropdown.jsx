import React from "react";

import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";

const Dropdown = ({dropdownOptions}) => {

    const handleDropDownFunction = (dropdownFunction) => dropdownFunction();

    const dropDownList = dropdownOptions.map((dropdownOption) => {
        if (dropdownOption["type"] === "url") {
            return <div key={dropdownOption["name"]}>
                <Link to={dropdownOption["url"]}>{dropdownOption["name"]}</Link>
            </div>;
        } else {
            return <div onClick={() => handleDropDownFunction(dropdownOption["functionDefinition"])}
                key={dropdownOption["name"]}>
                {dropdownOption["name"]}
            </div>;
        }
    });
    
    return (
        <div className="dropdown">
            <div className="dropdown-btn"><FaUser className="icon-right-4px"/> My Account</div>
            <div className="dropdown-content">
                {dropDownList}
            </div>
        </div>
    );
};

export default Dropdown;