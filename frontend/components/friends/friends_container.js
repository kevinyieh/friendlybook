import { connect } from "react-redux";
import { fetchFriendRequests } from "../../actions/friend_actions";
import { fetchUsers } from "../../actions/user_actions";
import Friends from "./friends";

const mSTP = state => {
    return {
        friendRequests: state.entities.friendRequests,
        currentUser: state.session,
        users: state.entities.users
    }
}

const mDTP = dispatch => {
    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests()),
        fetchUsers: users => fetchUsers(users)(dispatch)
    }
}

export default connect(mSTP,mDTP)(Friends);