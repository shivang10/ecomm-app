import React from "react";

import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Snackbar from "./components/snackbar/snackbar";
import PageRoutes from "./routes/routes";

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
