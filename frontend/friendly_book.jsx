import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import * as SearchUtil from "./util/search_util";
import { fetchAllFriends } from "./actions/friend_actions";

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
    window.fetchAllFriends = fetchAllFriends;
    window.getState = store.getState;
    window.fetchSearch = SearchUtil.fetchSearch;
    window.dispatch = store.dispatch;
    delete window.currentUser;
    ReactDOM.render(<Root store={store}/>, root );
})