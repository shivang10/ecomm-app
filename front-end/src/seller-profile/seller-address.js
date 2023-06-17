import {useEffect, useState} from "react";
import {sellerAddressService} from "../account/seller-account-services";

const SellerAddress = () => {
    const [sellerAddress, updateSellerAddress] = useState([]);

    useEffect(() => {
        sellerAddressService()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (<div>
        My address
        {sellerAddress.map((address) => {
            return {address}
        })}
    </div>)
}
export default SellerAddress;
