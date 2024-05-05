import React from "react";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import sellerAccount from "./seller-account";
import userAccount from "./user-account";
import {enums} from "../../../Utils/enums/enums";

const Account = () => {

    const auth = useSelector(state => state.auth);
    const accountType = auth.type;
    const profileId = auth.id;
    const getUrl = (accountUrl) => accountUrl.replace("/:id", `/${profileId}`);

    const generateAccountOptionCards = (accountOpt) => accountOpt.map((accountOption) => (
        <Link className="card" key={accountOption.name} to={getUrl(accountOption.url)}>
            <header className="card-header">
                <p className="card-header-title is-centered">
                    {accountOption.name}
                </p>
            </header>
            <footer className="card-footer">
                <span className="card-footer-item is-size-6 ">
                    <span className={`mr-1 is-size-3 ${accountOption.styles}`}> {accountOption.icon}</span>
                    {accountOption.description}
                </span>
            </footer>
        </Link>)
    );

    let accountCards;

    if (accountType === enums.user.account) {
        accountCards = generateAccountOptionCards(userAccount);
    } else {
        accountCards = generateAccountOptionCards(sellerAccount);
    }

    return (
        <div className="accountBoard">
            {accountCards}
        </div>
    );
};

export default Account;
