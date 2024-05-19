import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";

import {getOrdersService} from "./orders-service";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const GetUserOrders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, updateOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        getOrdersService()
            .then((res) => {
                const data = res.data.data;
                setLoading(false);
                updateOrders(data);
            }).catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-list">
            <h2>Your Orders</h2>
            <table className="table is-bordered is-striped is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Total Items</th>
                        <th>Order Date</th>
                        <th>Payment Method</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className="order-row">
                            <td>{order._id}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.items.length}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.paymentMethod}</td>
                            <td><Link to={`/order-info/${order._id}`}>Info</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetUserOrders;
