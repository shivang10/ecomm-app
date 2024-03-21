import React from "react";

const Dropdown = ({dropdownOptions}) => {

    const handleDropDownFunction = (dropdownFunction) => dropdownFunction();

    const dropDownList = dropdownOptions.map((dropdownOption) => {
        if (dropdownOption["type"] === "url") {
            return <a
                key={dropdownOption["name"]}
                href={dropdownOption["url"]}
                className="navbar-item is-size-6 is-info is-light">
                {dropdownOption["name"]}
            </a>;
        } else {
            return <a className="navbar-item is-size-6 is-info is-light"
                onClick={() => handleDropDownFunction(dropdownOption["functionDefinition"])}
                key={dropdownOption["name"]}>
                {dropdownOption["name"]}
            </a>;
        }
    });

    return (
        <div className="navbar-dropdown">
            {dropDownList}
        </div>
    );
};

export default Dropdown;