import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded",() => {
    const root = document.getElementById("root");
    const currentUser = window.currentUser;
    let store = null;
    if (currentUser){
        store = configureStore({
            session: {
                id: currentUser.id,
                pronoun: currentUser.pronoun.split("/")
            }
        })
    }else {
        store = configureStore();
    }
    window.getState = store.getState;
    delete window.currentUser;
    ReactDOM.render(<Root store={store}/>, root );
})