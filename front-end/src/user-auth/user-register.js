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
    return (<div className="userAuth-background">
        <form className="userAuth-form">
            <h3>Register Here</h3>

            <label htmlFor="username">Email</label>
            <input value={userDetails.email} onChange={handleChange} type="text" placeholder="Email" name="email"/>

            <label htmlFor="username">Username</label>
            <input value={userDetails.username} onChange={handleChange} type="text" placeholder="Username"
                   name="username"/>

            <label htmlFor="username">Phone Number</label>
            <input value={userDetails.phoneNumber} onChange={handleChange} type="text" placeholder="Phone Number"
                   name="phoneNumber"/>

            <label htmlFor="password">Password</label>
            <input value={userDetails.password} onChange={handleChange} type="password" placeholder="Password"
                   name="password"/>

            <button onClick={handleSubmit}>Register</button>
            <button>Already a user? <Link to={userLoginLink}>Login</Link></button>
        </form>
    </div>)
}

export default UserRegister;