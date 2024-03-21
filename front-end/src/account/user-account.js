import React from "react";

import {BsFillBoxSeamFill} from "react-icons/bs";
import {CgProfile} from "react-icons/cg";
import {FaRegAddressCard} from "react-icons/fa";
import {MdPayment} from "react-icons/md";

import {ordersPlacedLink, paymentMethodsLink, userAddressLink, userProfileLink} from "../routes/routesLink";

const userAccount = [
    {
        name: "Profile", url: userProfileLink, type: "url", icon: <CgProfile/>, description: "Your profile",
        styles: "has-text-link"
    },
    {
        name: "Addresses",
        url: userAddressLink,
        type: "url",
        icon: <FaRegAddressCard/>,
        description: "View and edit your addresses",
        styles: "green-color-1"
    },
    {
        name: "Payment Methods",
        url: paymentMethodsLink,
        type: "url",
        icon: <MdPayment/>,
        description: "View and edit your payment methods",
        styles: "grey-color-1"
    },
    {
        name: "Orders",
        url: ordersPlacedLink,
        type: "url",
        icon: <BsFillBoxSeamFill/>,
        description: "View your all orders",
        styles: "brown-color"
    }
];

export default userAccount;
