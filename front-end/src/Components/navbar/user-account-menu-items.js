import {accountLink} from "../../Routes/routesLink";
import {logoutProfile} from "../../Utils/auth/profile-auth-operations";

export const userAccountMenuItems = [
    {
        name: "Account", url: accountLink, type: "url"
    }, {
        name: "Logout", type: "function", functionDefinition: logoutProfile,
    }
];