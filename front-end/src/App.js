import "./App.scss";
import Navbar from "./components/navbar/navbar";
import PageRoutes from "./routes/routes";
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar/>
                <PageRoutes/>
            </Router>
        </Provider>
    );
}

export default App;
