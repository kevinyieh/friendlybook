import { combineReducers } from "redux";
import friendsReducer from "./friends/friends_reducer";

export default combineReducers({
    friends: friendsReducer
})