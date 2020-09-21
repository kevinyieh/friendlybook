import React from "react";
import App from "./app";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

export default function Root({ store }){
    return (
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    )
}
