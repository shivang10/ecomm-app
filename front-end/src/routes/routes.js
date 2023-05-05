import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {homepageLink, userLoginLink, userRegisterLink} from "./routesLink";

const Homepage = lazy(() => import("../homepage/homepage"));
const UserRegister = lazy(() => import("../user-auth/user-register"));
const UserLogin = lazy(() => import("../user-auth/user-login"));

const PageRoutes = () => {
    return (
        <Suspense fallback={<div>...</div>}>
            <Routes>
                <Route exact path={homepageLink} element={<Homepage/>}/>
                <Route exact path={userLoginLink} element={<UserLogin/>}/>
                <Route exact path={userRegisterLink} element={<UserRegister/>}/>
            </Routes>
        </Suspense>
    )
}
export default PageRoutes;
