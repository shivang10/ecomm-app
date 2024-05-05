import React from "react";

import {CgProfile} from "react-icons/cg";
import {FaChartPie, FaRegAddressCard, FaStore} from "react-icons/fa";

import {revenueLink, sellerAddressLink, sellerProfileLink, storeLink,} from "../../../Routes/routesLink";

const sellerAccount = [
    {
        name: "Profile", url: sellerProfileLink, type: "url", description: "Your profile", icon: <CgProfile/>,
    },
    {
        name: "Addresses",
        url: sellerAddressLink,
        type: "url",
        description: "View and edit your addresses",
        icon: <FaRegAddressCard/>,
    },
    {
        name: "Store", url: storeLink, type: "url", description: "View and edit your store details", icon: <FaStore/>,
    },
    {
        name: "Revenue", url: revenueLink, type: "url", description: "View your revenue", icon: <FaChartPie/>,
    }
];

export default sellerAccount;
