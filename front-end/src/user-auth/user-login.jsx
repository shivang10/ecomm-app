import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {userAuthLoginService} from "./services";
import {setSnackBarStatus} from "../action-creators/notification-action-creators";
import {sellerLoginLink, userRegisterLink} from "../routes/routesLink";
import {enums} from "../utils/enums/enums";
import {setLocalCache} from "../utils/local-cache/local-cache";

const UserLogin = () => {
    const navigate = useNavigate();
    const [userDetails, updateUserDetails] = useState({
        "email": "", "password": ""
    });
    const handleChange = (event) => {
        updateUserDetails({
            ...userDetails, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userAuthLoginService(userDetails)
            .then(res => {
                const message = res.data.message;
                setLocalCache(enums.user.token, res.data.data.token);
                setSnackBarStatus(enums.snackBar.success, message);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2500);
            })
            .catch(err => {
                setSnackBarStatus(enums.snackBar.danger, err?.response?.data?.message);
            });
    };

    return (
        <div className="flex-hc-vc">
            <div className="card">
                <div className="card-content content">
                    <form className="mb-2">
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
                            <p className="control">
                                <button className="button is-info" onClick={handleSubmit}>
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        Don&apos;t have an<br/> account?
                        <a href={userRegisterLink} className="button is-info">Register</a>
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

export default UserLogin;