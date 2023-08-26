import React from "react";

import "./App.scss";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import { store } from "./redux/store";
import PageRoutes from "./routes/routes";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <PageRoutes />
            </Router>
        </Provider>
    );
}

export default App;
