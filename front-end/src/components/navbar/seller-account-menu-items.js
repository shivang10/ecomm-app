import {accountLink} from "../../routes/routesLink";
import {logoutProfile} from "../../utils/auth/profile-auth-operations";

export const sellerAccountMenuItems = [
    {
        name: "Account", url: accountLink, type: "url"
    },
    {
        name: "Logout", type: "function", functionDefinition: logoutProfile,
    }
];