import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {sellerAuthLoginService} from "./services";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {sellerRegisterLink, userLoginLink} from "../../../Routes/routesLink";
import {enums} from "../../../Utils/enums/enums";
import {setLocalCache} from "../../../Utils/local-cache/local-cache";

const SellerLogin = () => {
    const navigate = useNavigate();
    const [sellerDetails, updateSellerDetails] = useState({
        "email": "", "password": ""
    });
    const handleChange = (event) => {
        updateSellerDetails({
            ...sellerDetails, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sellerAuthLoginService(sellerDetails)
            .then(res => {
                const token = res.data.data.token;
                const message = res.data.message;
                setLocalCache(enums.common.token, token);
                setSnackBarStatus(enums.snackBar.success, message);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2500);
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
                        <div className="field flex-hc-vc">
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
                        Don&apos;t have an account?
                        <a href={sellerRegisterLink} className="button is-info">Register</a>
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

export default SellerLogin;