import React from "react";

import "./App.scss";
import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Snackbar from "./components/snackbar/snackbar";
import PageRoutes from "./routes/routes";
import {getLocalCache} from "./utils/local-cache/local-cache";

axios.interceptors.request.use(config => {
    const authToken = getLocalCache("token");
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

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
