import { connect } from "react-redux";
import { fetchFriendRequests,acceptFriendRequest,rejectFriendRequest } from "../../actions/friend_actions";
import { fetchUsers } from "../../actions/user_actions";
import Friends from "./friends";

const mSTP = state => {
    let requests = [];
    let receives = [];
    if(state.entities.friendRequests){
        requests = Object.values(state.entities.friendRequests).filter( req => req.userId === state.session.id ).sort((r1,r2) => r1.createdAt > r2.createdAt ? -1 : 1);
        receives = Object.values(state.entities.friendRequests).filter( req => req.friendId === state.session.id ).sort((r1,r2) => r1.createdAt > r2.createdAt ? -1 : 1);
    }
    debugger;
    return {
        friendRequests: state.entities.friendRequests,
        currentUser: state.session,
        users: state.entities.users,
        requests,
        receives
    }
}

const mDTP = dispatch => {
    return {
        fetchFriendRequests: () => fetchFriendRequests()(dispatch),
        fetchUsers: users => fetchUsers(users)(dispatch),
        acceptFriendRequest: id => acceptFriendRequest(id)(dispatch),
        rejectFriendRequest: id => rejectFriendRequest(id)(dispatch)
    }
}

export default connect(mSTP,mDTP)(Friends);