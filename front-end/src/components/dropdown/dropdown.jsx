import React from "react";

const Dropdown = ({dropdownOptions}) => {

    const handleDropDownFunction = (dropdownFunction) => dropdownFunction();

    const dropDownList = dropdownOptions.map((dropdownOption) => {
        if (dropdownOption["type"] === "url") {
            return <a
                key={dropdownOption["name"]}
                href={dropdownOption["url"]}
                className="dropdown-item is-size-6 is-info is-light">
                {dropdownOption["name"]}
            </a>;
        } else {
            return <a className="dropdown-item is-size-6 is-info is-light"
                onClick={() => handleDropDownFunction(dropdownOption["functionDefinition"])}
                key={dropdownOption["name"]}>
                {dropdownOption["name"]}
            </a>;
        }
    });

    return (
        <div className="dropdown is-hoverable is-right">
            <div className="dropdown-trigger">
                <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                    My Account
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                <div className="dropdown-content">
                    {dropDownList}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;