import {useState} from "react";

import {Link} from "react-router-dom";
import {userRegisterLink} from "../routes/routesLink";
import {userAuthLoginService} from "./services";

const UserLogin = () => {

    const [userDetails, updateUserDetails] = useState({
        "email": "", "password": ""
    });

    const handleChange = (event) => {
        updateUserDetails({
            ...userDetails, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userAuthLoginService(userDetails)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <div className="userAuth">
            <form className="userAuth-form">
                <div className="text-36px-black-600 flex-hc-vc">Login</div>
                <hr className="divider-horizontal"/>
                <label className="text-24px-black-500" htmlFor="username">Email</label>
                <input value={userDetails.email} onChange={handleChange} type="text" placeholder="Email" name="email"/>

                <label className="text-24px-black-500" htmlFor="password">Password</label>
                <input value={userDetails.password} onChange={handleChange} type="password" placeholder="Password"
                       name="password"/>

                <div className="btn-22px-black" onClick={handleSubmit}>Log In</div>
                <div className="text-20px-black-500 flex-hc-vc">
                    Don't have an account?{" "}<Link className="btn-20px-black" to={userRegisterLink}>Register</Link>
                </div>
            </form>
    </div>);
};

export default UserLogin;