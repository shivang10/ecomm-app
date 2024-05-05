import React from "react";

import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom";

import Navbar from "./Components/navbar/navbar";
import Snackbar from "./Components/snackbar/snackbar";
import PageRoutes from "./Routes/routes";

function App() {
    return (
        <Router>
            <Snackbar/>
            <Navbar/>
            <PageRoutes/>
        </Router>
    );
}

export default App;
