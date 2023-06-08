import {getLocalCache} from "../utils/local-cache/local-cache";
import {enums} from "../utils/enums/enums";
import jwt from "jwt-decode";
import sellerAccount from "./seller-account";
import userAccount from "./user-account";
import {Link} from "react-router-dom";

const Account = () => {
    const token = getLocalCache(enums.user.token);
    let accountType = enums.navbar.common;
    if (token) {
        const decoded = jwt(token);
        accountType = decoded["type"];
    }

    const generateAccountOptionCards = (accountOpt) => accountOpt.map((accountOption) => {
        return <Link className="accountBoard-card" key={accountOption["name"]} to={accountOption["url"]}>
            <div className="accountBoard-card__heading text-36px-black-600">{accountOption["name"]}</div>
            <div className="accountBoard-card__logo">{accountOption["icon"]}</div>
            <div className="accountBoard-card__description text-24px-black-500">
                {accountOption["description"]}
            </div>
        </Link>
    })

    let accountCards;

    if (accountType === enums.user.account) {
        accountCards = generateAccountOptionCards(userAccount)
    } else {
        accountCards = generateAccountOptionCards(sellerAccount)
    }

    return (<div className="accountBoard">
        {accountCards}
    </div>)
}

export default Account;
