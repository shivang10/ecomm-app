import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {sellerAuthLoginService} from "./services";
import {sellerRegisterLink, userLoginLink} from "../routes/routesLink";
import {enums} from "../utils/enums/enums";
import {setLocalCache} from "../utils/local-cache/local-cache";

const SellerLogin = () => {

    const navigate = useNavigate();
    const [sellerDetails, updateSellerDetails] = useState({
        "email": "", "password": ""
    });
    const [snackType, updateSnackType] = useState({type: "", message: ""});

    const handleChange = (event) => {
        updateSellerDetails({
            ...sellerDetails, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sellerAuthLoginService(sellerDetails)
            .then(res => {
                setLocalCache(enums.seller.token, res.data.data.token);
                updateSnackType({type: enums.snackBar.success, message: res.data.message});
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                updateSnackType({type: enums.snackBar.error, message: err.response.data.message});
                setTimeout(() => {
                    updateSnackType({type: "", message: ""});
                }, 2500);
            });
    };

    return (<div className="flex-hc-vc">
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
                    Don&apos;t have an account?
                    <a href={sellerRegisterLink} className="button is-info">Register</a>
                </div>
                <div className="card-footer-item">
                    Want to buy?
                    <a href={userLoginLink} className="button is-info">Login</a>
                </div>
            </footer>
        </div>
    </div>);
};

export default SellerLogin;