import React, {useState} from "react";

import {updateProductReviewService} from "./orders-service";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const UpdateProductRating = (props) => {
    const orderId = props.orderId;
    const rid = props.rid;
    const [ratings, setRatings] = useState({
        rating: props.rating, description: props.description
    });

    const submitRating = (event) => {
        event.preventDefault();
        updateProductReviewService(orderId, rid, ratings)
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
                onClick={submitRating}>Update your rating
            </button>
        </form>
    </div>);
};

export default UpdateProductRating;
