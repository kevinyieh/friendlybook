import { connect } from "react-redux";
import MiniFriends from "./mini_friends";

const mSTP = (state,ownProps) => {
    return {
        user: ownProps.user,
        friends: Object.values(state.entities.friends)
    }
}

const mDTP = dispatch => {
    return {
    }
}

export default connect(mSTP,mDTP)(MiniFriends);