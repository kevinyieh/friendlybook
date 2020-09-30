import { connect } from "react-redux";
import { fetchAllFriends } from "../../../actions/friend_actions"
import MiniFriends from "./mini_friends";

const mSTP = (state,ownProps) => {
    return {
        user: ownProps.user,
        friends: Object.values(state.entities.friends)
    }
}

const mDTP = dispatch => {
    return {
        fetchAllFriends: id => fetchAllFriends(id)(dispatch)
    }
}

export default connect(mSTP,mDTP)(MiniFriends);