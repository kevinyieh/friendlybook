import { connect } from "react-redux";
import RightNav from "./right_nav";
import { withRouter } from "react-router-dom";
import { fetchAllFriends } from "../../../actions/friend_actions";

const mSTP = state => {
    return {
        currentUser: state.session,
        friends: Object.values(state.entities.friends)
    }
}

const mDTP = dispatch => {
    return {
        fetchAllFriends: (userId) => {
            dispatch(fetchAllFriends(userId))
        }
    }
}

export default withRouter(connect(mSTP,mDTP)(RightNav));