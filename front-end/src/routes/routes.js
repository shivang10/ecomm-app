import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {homepageLink, userLoginLink, userRegisterLink, sellerLoginLink, sellerRegisterLink} from "./routesLink";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

const Homepage = lazy(() => import("../homepage/homepage"));
const UserRegister = lazy(() => import("../user-auth/user-register"));
const UserLogin = lazy(() => import("../user-auth/user-login"));
const SellerRegister = lazy(() => import("../seller-auth/seller-register"));
const SellerLogin = lazy(() => import("../seller-auth/seller-login"));

const PageRoutes = () => {
    return (
        <Suspense fallback={<div>...</div>}>
            <Routes>
                <Route path={homepageLink} element={<PrivateRoute/>}>
                    <Route exact path={homepageLink} element={<Homepage/>}/>
                </Route>
                <Route path={homepageLink} element={<PublicRoute/>}>
                    <Route exact path={homepageLink} element={<Homepage/>}/>
                    <Route exact path={userLoginLink} element={<UserLogin/>}/>
                    <Route exact path={userRegisterLink} element={<UserRegister/>}/>
                    <Route exact path={sellerLoginLink} element={<SellerLogin/>}/>
                    <Route exact path={sellerRegisterLink} element={<SellerRegister/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}
export default PageRoutes;
