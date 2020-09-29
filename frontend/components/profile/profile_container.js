import {connect} from "react-redux";
import Profile from "./profile";

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
        // fetchUser: id => 
    }
}

export default connect(mSTP,mDTP)(Profile)