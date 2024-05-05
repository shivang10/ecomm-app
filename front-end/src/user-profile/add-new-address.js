import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {userAddAddressService} from "../account/user-account-service";
import {setSnackBarStatus} from "../action-creators/notification-action-creators";
import {enums} from "../utils/enums/enums";

const AddNewAddress = () => {

    const [address, setAddress] = useState({
        unitNumber: "", streetNo: "", locality: "", landmark: "", city: "", state: "", pinCode: "", country: ""
    });
    const navigate = useNavigate();


    const handleChange = (event) => {
        setAddress({
            ...address, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userAddAddressService(address)
            .then(res => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2500);
            })
            .catch(err => {
                setSnackBarStatus(enums.snackBar.danger, err.response.data.message);
            });
    };

    return (<div>
        Add New Address
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
                        Add
                    </button>
                </p>
            </div>
        </form>
    </div>);
};
export default AddNewAddress;
