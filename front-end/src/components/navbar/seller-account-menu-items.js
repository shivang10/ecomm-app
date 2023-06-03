import {logoutUser} from "../../utils/auth/user-auth-operations";

export const sellerAccountMenuItems = [
    {
        name: 'Account', url: '/about', type: "url"
    },
    {
        name: "Logout", type: "function", functionDefinition: logoutUser,
    }
];