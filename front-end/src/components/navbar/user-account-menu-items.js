import {accountLink} from "../../routes/routesLink";
import {logoutProfile} from "../../utils/auth/profile-auth-operations";

export const userAccountMenuItems = [
    {
        name: "Account", url: accountLink, type: "url"
    }, {
        name: "Logout", type: "function", functionDefinition: logoutProfile,
    }
];