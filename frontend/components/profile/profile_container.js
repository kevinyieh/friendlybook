import {connect} from "react-redux";
import Profile from "./profile";
import { fetchUser } from "../../actions/user_actions";
import { fetchWallFeed } from "../../actions/post_actions";

const mSTP = (state,ownProps) => {
    const user = state.entities.users[ownProps.match.params.userId]
    return {
        currentUser: state.session,
        user,
        match: ownProps.match
    }
}

const mDTP = dispatch => {
    return {
        fetchUser: id => fetchUser(id)(dispatch),
        fetchWallFeed: id => dispatch(fetchWallFeed(id))
    }
}

export default connect(mSTP,mDTP)(Profile)