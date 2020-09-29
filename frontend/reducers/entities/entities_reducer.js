import { combineReducers } from "redux";
import friendsReducer from "./friends/friends_reducer";
import postsReducer from "./posts/posts_reducer";
import usersReducer from "./users/users_reducer";
import friendRequestsReducer from "./friend_requests/friend_requests_reducer";

export default combineReducers({
    users: usersReducer,
    friends: friendsReducer,
    posts: postsReducer,
    friendRequests: friendRequestsReducer
})