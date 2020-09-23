import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import * as SearchUtil from "./util/search_util";

document.addEventListener("DOMContentLoaded",() => {
    const root = document.getElementById("root");
    const currentUser = window.currentUser;
    let store = null;
    if (currentUser){
        store = configureStore({
            session: {
                id: currentUser.id,
                pronoun: currentUser.pronoun.split("/"),
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            }
        })
    }else {
        store = configureStore();
    }
    window.getState = store.getState;
    window.fetchSearch = SearchUtil.fetchSearch;
    delete window.currentUser;
    ReactDOM.render(<Root store={store}/>, root );
})