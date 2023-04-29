import "./App.scss";
import Navbar from "./components/navbar/navbar";
import PageRoutes from "./routes/routes";
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => {
    return (<Router>
        <Navbar/>
        <PageRoutes/>
    </Router>);
}

export default App;
