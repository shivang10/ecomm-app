import React, {useState} from "react";

import {userAuthRegisterService} from "./services";
import {setSnackBarStatus} from "../action-creators/notification-action-creators";
import {sellerLoginLink, userLoginLink} from "../routes/routesLink";
import {enums} from "../utils/enums/enums";

const UserRegister = () => {
    const [userDetails, updateUserDetails] = useState({
        "email": "", "password": "", "username": "", "phoneNumber": ""
    });
    const handleChange = (event) => {
        updateUserDetails({
            ...userDetails, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userAuthRegisterService(userDetails)
            .then(res => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
            })
            .catch(err => {
                console.error(err.response.data.message);
            });
    };
    return (
        <div className="flex-hc-vc">
            <div className="card">
                <div className="card-content content">
                    <form className="mb-2">
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="Username" value={userDetails.username}
                                    onChange={handleChange} name="username" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" value={userDetails.email}
                                    onChange={handleChange} name="email" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password"
                                    value={userDetails.password}
                                    onChange={handleChange} name="password" required={true}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="number" placeholder="Phone Number"
                                    value={userDetails.phoneNumber}
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
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        Already a user?
                        <a href={userLoginLink} className="button is-info">Login</a>
                    </div>
                    <div className="card-footer-item">
                        Want to sell items?
                        <a href={sellerLoginLink} className="button is-info">Login</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default UserRegister;