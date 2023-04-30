import {useState} from "react";

import {Link} from "react-router-dom";
import {userLoginLink} from "../routes/routesLink";
import {userAuthRegisterService} from "./services";

const UserRegister = () => {

    const [userDetails, updateUserDetails] = useState({
        "email": "", "password": "", "username": "", "phoneNumber": ""
    });

    const handleChange = (event) => {
        updateUserDetails({
            ...userDetails, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userAuthRegisterService(userDetails)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
    }
    return (
        <div className="userAuth">
            <form autoComplete="off" className="userAuth-form">
                <div className="text-36px-black-600 flex-hc-vc">Register</div>
                <hr className="divider-horizontal"/>

                <label className="text-24px-black-500" htmlFor="username">Email</label>
                <input value={userDetails.email} onChange={handleChange} type="text" placeholder="Email" name="email"/>

                <label className="text-24px-black-500" htmlFor="username">Username</label>
                <input value={userDetails.username} onChange={handleChange} type="text" placeholder="Username"
                       name="username"/>

                <label className="text-24px-black-500" htmlFor="username">Phone Number</label>
                <input value={userDetails.phoneNumber} onChange={handleChange} type="text" placeholder="Phone Number"
                       name="phoneNumber"/>

                <label className="text-24px-black-500" htmlFor="password">Password</label>
                <input value={userDetails.password} onChange={handleChange} type="password" placeholder="Password"
                       name="password"/>

                <div className="btn-22px-black" onClick={handleSubmit}>Register</div>
                <div className="text-20px-black-500 flex-hc-vc">
                    Already a user? <Link className="btn-20px-black" to={userLoginLink}>Login</Link>
                </div>
            </form>
    </div>)
}

export default UserRegister;