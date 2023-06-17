import {sellerAddressLink, sellerProfileLink, revenueLink, storeLink} from "../routes/routesLink";
import {CgProfile} from "react-icons/cg";
import {FaRegAddressCard, FaStore, FaChartPie} from "react-icons/fa";

const sellerAccount = [{
    name: "Profile", url: sellerProfileLink, type: "url", description: "Your profile", icon: <CgProfile/>
}, {
    name: "Addresses",
    url: sellerAddressLink,
    type: "url",
    description: "View and edit your addresses",
    icon: <FaRegAddressCard/>
}, {
    name: "Store", url: storeLink, type: "url", description: "View and edit your store details", icon: <FaStore/>
}, {
    name: "Revenue", url: revenueLink, type: "url", description: "View your revenue", icon: <FaChartPie/>
}];

export default sellerAccount;
