import React from "react";

import jwt from "jwt-decode";

import sellerAccount from "./seller-account";
import userAccount from "./user-account";
import {enums} from "../utils/enums/enums";
import {getLocalCache} from "../utils/local-cache/local-cache";

function Account() {
    const token = getLocalCache(enums.user.token);
    let accountType = enums.navbar.common;
    let profileId;
    if (token) {
        const decoded = jwt(token);
        accountType = decoded.type;
        profileId = decoded.id;
    }

    const getUrl = (accountUrl) => accountUrl.replace("/:id", `/${profileId}`);

    const generateAccountOptionCards = (accountOpt) => accountOpt.map((accountOption) => (
        <a className="card" key={accountOption.name} href={getUrl(accountOption.url)}>
            <header className="card-header">
                <p className="card-header-title is-centered">
                    {accountOption.name}
                </p>
            </header>
            <footer className="card-footer">
                <div className="card-footer-item is-size-6 ">
                    <span className="mr-1"> {accountOption.icon}</span> {accountOption.description}
                </div>
            </footer>
        </a>
    ));

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
}

export default Account;
