import React, {useEffect, useState} from "react";

import {Link, useParams} from "react-router-dom";

import AddProductRating from "./add-product-rating";
import {cancelSingleOrderItemService, cancelWholeOrderService, singleOrderInfoService} from "./orders-service";
import UpdateProductRating from "./update-product-rating";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";
import splitCamelCaseAndCapitalize from "../../../Utils/helper-functions/camelCaseAndCapitalize";

const orderCancellationStatus = ["placed", "packed", "outForDelivery"];

const OrderInfo = () => {

    const [order, setOrders] = useState({});
    const params = useParams();
    const oid = params.oid;
    const [cancelWholeOrder, setCancelWholeOrder] = useState(false);

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const fetchOrdersData = () => {
        singleOrderInfoService(oid)
            .then((res) => {
                const data = res.data.data;
                const isWholeOrderCancellable = data.items.some((item) => orderCancellationStatus.includes(item.orderStatus));
                setCancelWholeOrder(isWholeOrderCancellable);
                setOrders(data);
            })
            .catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };

    const handleCancelSingleItem = (productId) => () => {
        cancelSingleOrderItemService(oid, productId)
            .then((res) => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
                fetchOrdersData();
            })
            .catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.message);
            });
    };

    const handleCancelWholeOrder = () => {
        cancelWholeOrderService(oid)
            .then((res) => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
                fetchOrdersData();
            })
            .catch((err) => {
                setSnackBarStatus(enums.snackBar.danger, err.message);
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

    const singleItemCancelRow = (item) => {
        const canItemBeCancelled = orderCancellationStatus.includes(item.orderStatus);
        if (canItemBeCancelled) {
            return (
                <button onClick={handleCancelSingleItem(item._id)}>Cancel this item</button>
            );
        } else {
            const status = splitCamelCaseAndCapitalize(item.orderStatus);
            return <div>{status}</div>;
        }
    };

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
                        <th>Cancel Item</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (<React.Fragment key={item._id}>
                        <tr key={item.productId}>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>{item.priceBeforeDiscount}</td>
                            <td>{item.priceAfterDiscount}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.orderStatus}</td>
                            <td><Link to={`/product/${item.productId}`}>Info</Link></td>
                            <td>
                                {singleItemCancelRow(item)}
                            </td>
                        </tr>
                        <tr className="order-details">
                            <td colSpan="5">
                                {Object.keys(item.review).length === 0 ?
                                    <AddProductRating orderId={oid} itemId={item.productId}/> :
                                    <UpdateProductRating orderId={oid} itemId={item.productId}
                                        rid={item.review._id} rating={item.review.rating}
                                        description={item.review.description}/>
                                }
                            </td>
                        </tr>
                    </React.Fragment>))}
                </tbody>
            </table>
            <div>
                Payment : {order.paymentMethod}
            </div>
            {cancelWholeOrder && <button onClick={handleCancelWholeOrder}>Cancel Order</button>}
        </div>
    </div>);
};

export default OrderInfo;
