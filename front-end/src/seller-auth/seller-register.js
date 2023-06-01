import {useState} from "react";

import {Link} from "react-router-dom";
import {sellerLoginLink} from "../routes/routesLink";
import {sellerAuthRegisterService} from "./services";
import Snackbar from "../components/snackbar/snackbar";
import {enums} from "../utils/enums/enums";

const UserRegister = () => {

    const [sellerDetails, updateSellerDetails] = useState({
        "email": "", "password": "", "username": "", "phoneNumber": ""
    });

    const [snackType, updateSnackType] = useState({type: "", message: ""});

    const handleChange = (event) => {
        updateSellerDetails({
            ...sellerDetails, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sellerAuthRegisterService(sellerDetails)
            .then(res => {
                updateSnackType({type: enums.snackBar.success, message: res.data.message})
            })
            .catch(err => {
                updateSnackType({type: enums.snackBar.error, message: err.response.data.message})
            });
    }
    return (
        <div className="flex-hc-vc">
            <form className="userAuth-form">
                <div className="text-36px-black-600 flex-hc-vc">Register</div>
                <hr className="divider-horizontal"/>

                <label className="text-24px-black-500" htmlFor="email">Email</label>
                <input value={sellerDetails.email} onChange={handleChange} type="text" placeholder="Email"
                       name="email"/>

                <label className="text-24px-black-500" htmlFor="username">Username</label>
                <input value={sellerDetails.username} onChange={handleChange} type="text" placeholder="Username"
                       name="username"/>

                <label className="text-24px-black-500" htmlFor="phoneNumber">Phone Number</label>
                <input value={sellerDetails.phoneNumber} onChange={handleChange} type="text" placeholder="Phone Number"
                       name="phoneNumber"/>

                <label className="text-24px-black-500" htmlFor="password">Password</label>
                <input value={sellerDetails.password} onChange={handleChange} type="password" placeholder="Password"
                       name="password"/>

                <div className="btn-22px-black flex-hc-vc" onClick={handleSubmit}>Register</div>
                <div className="text-20px-black-500 flex-hc-vc">
                    Already a seller? <Link className="btn-20px-black" to={sellerLoginLink}>Login</Link>
                </div>
                <Snackbar type={snackType.type} message={snackType.message}/>
            </form>
        </div>)
}

export default UserRegister;