import React from "react";

import {Link} from "react-router-dom";

const Dropdown = ({dropdownOptions}) => {

    const handleDropDownFunction = (dropdownFunction) => dropdownFunction();

    const dropDownList = dropdownOptions.map((dropdownOption) => {
        if (dropdownOption["type"] === "url") {
            return <Link
                key={dropdownOption["name"]}
                to={dropdownOption["url"]}
                className="navbar-item is-size-6 is-info is-light">
                {dropdownOption["name"]}
            </Link>;
        } else {
            return <Link className="navbar-item is-size-6 is-info is-light"
                onClick={() => handleDropDownFunction(dropdownOption["functionDefinition"])}
                key={dropdownOption["name"]} to="">
                {dropdownOption["name"]}
            </Link>;
        }
    });

    return (
        <div className="navbar-dropdown">
            {dropDownList}
        </div>
    );
};

export default Dropdown;