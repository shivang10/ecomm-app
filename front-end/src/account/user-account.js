import {userProfileLink, userAddressLink, paymentMethodsLink, ordersPlacedLink} from "../routes/routesLink";
import {CgProfile} from "react-icons/cg";
import {FaRegAddressCard} from "react-icons/fa";
import {MdPayment} from "react-icons/md";
import {BsFillBoxSeamFill} from "react-icons/bs";

const userAccount = [{
    name: "Profile", url: userProfileLink, type: "url", icon: <CgProfile/>, description: "Your profile"
}, {
    name: "Addresses",
    url: userAddressLink,
    type: "url",
    icon: <FaRegAddressCard/>,
    description: "View and edit your addresses"
}, {
    name: "Payment Methods",
    url: paymentMethodsLink,
    type: "url",
    icon: <MdPayment/>,
    description: "View and edit your payment methods"
}, {
    name: "Orders", url: ordersPlacedLink, type: "url", icon: <BsFillBoxSeamFill/>, description: "View your all orders"
}];

export default userAccount;
