import React, {useEffect, useState} from "react";

import {Link, useParams} from "react-router-dom";

import {singleOrderInfoService} from "./orders-service";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const OrderInfo = () => {

    const [order, setOrders] = useState({});
    const params = useParams();
    const oid = params.oid;

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const fetchOrdersData = () => {
        singleOrderInfoService(oid)
            .then((res) => {
                const data = res.data.data;
                setOrders(data);
            })
            .catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };


    if (!order || Object.keys(order).length === 0) {
        return <div>Loading</div>;
    }

    let shippingAddress;

    if (order.shippingAddress) {
        let addressInfo = order.shippingAddress;
        shippingAddress = <div>
            <span>Unit Number: {addressInfo.unitNumber}</span>
            <span>City: {addressInfo.city}</span>
            <span>State: {addressInfo.state}</span>
            <span>Country: {addressInfo.country}</span>
            <span>ZipCode: {addressInfo.pinCode}</span>
        </div>;
    }

    const dateFormat = new Date(order.orderDate);

    return (<div>
        <div className="orders-container">
            <h2>Order #{order._id}</h2>
            <div className="order-top">
                <div>Total Amount: {order.totalPrice}</div>
                <div>Date: {`${dateFormat.getFullYear()}-${dateFormat.getMonth()}-${dateFormat.getDate()}`}</div>
            </div>
            <div>
                Shipping Address: {shippingAddress}
            </div>
            <table className="table is-bordered is-striped is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Old_Price</th>
                        <th>New_Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Order Status</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (<React.Fragment key={item._id}>
                        <tr key={item.productId}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.priceBeforeDiscount}</td>
                            <td>{item.priceAfterDiscount}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.orderStatus}</td>
                            <td><Link to={`/product/${item.productId}`}>Info</Link></td>
                        </tr>
                    </React.Fragment>))}
                </tbody>
            </table>
            <div>
                Payment : {order.paymentMethod}
            </div>
        </div>
    </div>);
};

export default OrderInfo;
