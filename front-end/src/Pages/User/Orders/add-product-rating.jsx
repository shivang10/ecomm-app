import React, {useState} from "react";

import {addProductReviewService} from "./orders-service";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const AddProductRating = (props) => {
    const orderId = props.orderId;
    const itemId = props.itemId;
    const [ratings, setRatings] = useState({
        rating: 1, description: ""
    });

    const submitRating = (event) => {
        event.preventDefault();
        addProductReviewService(orderId, itemId, ratings)
            .then(res => {
                console.log(res.data.message);
            })
            .catch(err => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });

    };

    const handleRating = (event) => {
        setRatings({
            ...ratings, [event.target.name]: event.target.value
        });
    };

    return (<div>
        <form>
            <input
                className="rating-input"
                value={ratings.rating}
                placeholder="Your rating" min={1}
                max={5}
                name="rating" type="number" onChange={handleRating}/>
            <input
                className="rating-input"
                value={ratings.description}
                placeholder="Description"
                name="description" type="text" onChange={handleRating}/>
            <button
                className="rating-button"
                onClick={submitRating}>Rate
                it
            </button>
        </form>
    </div>);
};

export default AddProductRating;
