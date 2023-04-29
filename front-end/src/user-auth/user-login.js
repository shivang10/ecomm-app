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

    return (<div className="userAuth-background">
        <form className="userAuth-form">
            <h3>Login Here</h3>

            <label htmlFor="username">Email</label>
            <input value={userDetails.email} onChange={handleChange} type="text" placeholder="Email" name="email"/>

            <label htmlFor="password">Password</label>
            <input value={userDetails.password} onChange={handleChange} type="password" placeholder="Password"
                   name="password"/>

            <button onClick={handleSubmit}>Log In</button>
            <button>Don't have an account? <Link to={userRegisterLink}>Register</Link></button>
        </form>
    </div>);
};

export default UserLogin;