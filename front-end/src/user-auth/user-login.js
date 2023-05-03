import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {Link} from "react-router-dom";
import {userRegisterLink} from "../routes/routesLink";
import {userAuthLoginService} from "./services";
import Snackbar from "../components/snackbar/snackbar";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import {setLocalCache} from "../utils/local-cache/local-cache";
import {enums} from "../utils/enums/enums";

const UserLogin = () => {

    const navigate = useNavigate();
    const [userDetails, updateUserDetails] = useState({
        "email": "", "password": ""
    });
    const [snackType, updateSnackType] = useState({type: "", message: ""});

    const handleChange = (event) => {
        updateUserDetails({
            ...userDetails, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userAuthLoginService(userDetails)
            .then(res => {
                setLocalCache(enums.user.token, res.data.data.token);
                updateSnackType({type: enums.snackBar.success, message: res.data.message});
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch(err => {
                updateSnackType({type: enums.snackBar.error, message: err.response.data.message})
            });
    }

    return (<div className="flex-hc-vc">
        <form className="userAuth-form">
            <div className="text-36px-black-600 flex-hc-vc">Login</div>
            <hr className="divider-horizontal"/>
            <label className="text-24px-black-500" htmlFor="username">Email</label>
            <input value={userDetails.email} onChange={handleChange} type="text" placeholder="Email" name="email"/>

            <label className="text-24px-black-500" htmlFor="password">Password</label>
            <input value={userDetails.password} onChange={handleChange} type="password" placeholder="Password"
                   name="password"/>

            <div className="btn-22px-black flex-hc-vc" onClick={handleSubmit}>
                Log In <BsFillArrowRightCircleFill className="icon-left-6px"/>
            </div>
            <div className="text-20px-black-500 flex-hc-vc">
                Don't have an account?{" "}<Link className="btn-20px-black" to={userRegisterLink}>Register</Link>
            </div>
            <Snackbar type={snackType.type} message={snackType.message}/>
        </form>
    </div>);
};

export default UserLogin;