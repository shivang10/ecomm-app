import {Link} from "react-router-dom";
import {homepageLink, userLoginLink} from "../../routes/routesLink";

const Navbar = () => {
    return (
        <div className="navbar">
            <div><Link to={homepageLink}>Home</Link></div>
            <div>Categories</div>
            <div>Search</div>
            <div/>
            <div className="navbar-account"><Link to={userLoginLink}>Account</Link></div>
        </div>
    );
};

export default Navbar;