import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {userAuthChangePasswordService} from "./user-auth-services";
import {setSnackBarStatus} from "../../../Action-Creators/notification-action-creators";
import {enums} from "../../../Utils/enums/enums";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        oldPassword: "", newPassword: "", confirmPassword: ""
    });

    const handleChange = (event) => {
        setPasswords({
            ...passwords, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            password: passwords.oldPassword, newPassword: passwords.newPassword
        };

        userAuthChangePasswordService(formData)
            .then(res => {
                const message = res.data.message;
                setSnackBarStatus(enums.snackBar.success, message);
                setTimeout(() => {
                    navigate("/account");
                    window.location.reload();
                }, 2500);
            })
            .catch(err => {
                console.error(err.response.data.message);
            });
    };

    return (<div className="flex-hc-vc">
        <div className="card">
            <div className="card-content content">
                <form className="mb-2">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="password" placeholder="Old Password"
                                value={passwords.oldPassword} onChange={handleChange} name="oldPassword"
                                required={true}/>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="New Password"
                                value={passwords.newPassword}
                                onChange={handleChange} name="newPassword" required={true}/>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Confirm Password"
                                value={passwords.confirmPassword}
                                onChange={handleChange} name="confirmPassword" required={true}/>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-info" onClick={handleSubmit}>
                                Change Password
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>);

};

export default ChangePassword;
