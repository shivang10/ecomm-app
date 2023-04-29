import {Route, Routes} from 'react-router-dom';
import {homepageLink, userLoginLink, userRegisterLink} from "./routesLink";
import Homepage from "../homepage/homepage";
import UserRegister from "../user-auth/user-register";
import UserLogin from "../user-auth/user-login";

const PageRoutes = () => {
    return (
        <Routes>
            <Route exact path={homepageLink} element={<Homepage />}/>
            <Route exact path={userLoginLink} element={<UserLogin />}/>
            <Route exact path={userRegisterLink} element={<UserRegister />}/>
        </Routes>)
}
export default PageRoutes;
