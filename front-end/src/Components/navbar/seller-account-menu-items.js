import {accountLink} from "../../Routes/routesLink";
import {logoutProfile} from "../../Utils/auth/profile-auth-operations";

export const sellerAccountMenuItems = [
    {
        name: "Account", url: accountLink, type: "url"
    },
    {
        name: "Logout", type: "function", functionDefinition: logoutProfile,
    }
];