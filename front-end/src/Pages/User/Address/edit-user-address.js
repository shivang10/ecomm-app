import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";

import {getSingleAddressInfoService, userEditAddressService} from "./address-services";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const EditAddress = () => {

    const navigate = useNavigate();
    const query = useParams();
    const aid = query.id;
    const [address, setAddress] = useState({
        unitNumber: "", streetNo: "", locality: "", landmark: "", city: "", state: "", pinCode: "", country: ""
    });

    const handleChange = (event) => {
        setAddress({
            ...address, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userEditAddressService(address, aid)
            .then(res => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
                setTimeout(() => {
                    navigate("/account");
                }, 2500);
            })
            .catch(err => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };

    const fetchAddressInfo = () => {
        getSingleAddressInfoService(aid)
            .then(res => {
                const addressInfo = res?.data?.data?.address[0];
                setAddress({
                    ...address,
                    ...addressInfo
                });
            })
            .catch(err => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };

    useEffect(() => {
        fetchAddressInfo();
    }, []);

    if (!address.pinCode) {
        navigate("/user-address");
    }

    return (<div>
        Update Address
        <form className="mb-2">
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Unit Number" value={address.unitNumber}
                        onChange={handleChange} name="unitNumber" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Street No" value={address.streetNo}
                        onChange={handleChange} name="streetNo" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Locality" value={address.locality}
                        onChange={handleChange} name="locality" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Landmark" value={address.landmark}
                        onChange={handleChange} name="landmark" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="City" value={address.city}
                        onChange={handleChange} name="city" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="State" value={address.state}
                        onChange={handleChange} name="state" required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="number" placeholder="PinCode" value={address.pinCode}
                        onChange={handleChange} name="pinCode" min={110000} max={999999} required={true}/>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Country" value={address.country}
                        onChange={handleChange} name="country" required={true}/>
                </p>
            </div>

            <div className="field">
                <p className="control">
                    <button className="button is-info" onClick={handleSubmit}>
                        Update
                    </button>
                </p>
            </div>
        </form>
    </div>);
};
export default EditAddress;
