import {logoutUser} from "../../utils/auth/user-auth-operations";
import {accountLink} from "../../routes/routesLink";

export const userAccountMenuItems = [{
    name: 'Account', url: accountLink, type: "url"
}, {
    name: "Logout", type: "function", functionDefinition: logoutUser,
}];