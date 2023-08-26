import { accountLink } from "../../routes/routesLink";
import { logoutUser } from "../../utils/auth/user-auth-operations";

export const userAccountMenuItems = [
    {
        name: "Account", url: accountLink, type: "url"
    }, {
        name: "Logout", type: "function", functionDefinition: logoutUser,
    }
];