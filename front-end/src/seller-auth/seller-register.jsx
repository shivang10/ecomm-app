import React, {useState} from "react";

import {sellerAuthRegisterService} from "./services";
import {sellerLoginLink, userLoginLink} from "../routes/routesLink";
import {enums} from "../utils/enums/enums";

const UserRegister = () => {

    const [sellerDetails, updateSellerDetails] = useState({
        "email": "", "password": "", "username": "", "phoneNumber": ""
    });

    const [snackType, updateSnackType] = useState({type: "", message: ""});

    const handleChange = (event) => {
        updateSellerDetails({
            ...sellerDetails, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sellerAuthRegisterService(sellerDetails)
            .then(res => {
                updateSnackType({type: enums.snackBar.success, message: res.data.message});
            })
            .catch(err => {
                updateSnackType({type: enums.snackBar.error, message: err.response.data.message});
            });
    };
    return (
        <div className="flex-hc-vc">
            <div className="card">
                <div className="card-content content">
                    <form className="mb-2">
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="Username"
                                    value={sellerDetails.username}
                                    onChange={handleChange} name="username" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" value={sellerDetails.email}
                                    onChange={handleChange} name="email" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password"
                                    value={sellerDetails.password}
                                    onChange={handleChange} name="password" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="number" placeholder="Phone Number"
                                    value={sellerDetails.phoneNumber}
                                    onChange={handleChange} name="phoneNumber" required={true}/>
                            </p>
                        </div>
                        <div className="field flex-hc-vc">
                            <p className="control">
                                <button className="button is-info" onClick={handleSubmit}>
                                    Register
                                </button>
                            </p>
                        </div>
                    </form>
                    {snackType.type === enums.snackBar.success &&
                        <div className="notification is-primary is-light is-small pl-3 py-4">
                            {snackType.message}
                        </div>
                    }
                    {snackType.type === enums.snackBar.error &&
                        <div className="notification is-danger is-light is-small pl-3 py-4">
                            {snackType.message}
                        </div>
                    }
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        Already a seller?
                        <a href={sellerLoginLink} className="button is-info">Login</a>
                    </div>
                    <div className="card-footer-item">
                        Want to buy?
                        <a href={userLoginLink} className="button is-info">Login</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default UserRegister;