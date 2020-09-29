import {connect} from "react-redux";
import Profile from "./profile";
import { fetchUser,fetchUsers } from "../../actions/user_actions";
import { fetchWallFeed } from "../../actions/post_actions";

const mSTP = (state,ownProps) => {
    const userId = ownProps.profileSelected ? ownProps.profileSelected : ownProps.match.params.userId;
    const friendView = !!ownProps.friendView;
    const user =  state.entities.users[userId]
    return {
        currentUser: state.session,
        user,
        userId,
        friendView,
        posts: Object.values(state.entities.posts).sort( (post1,post2) => post1.createdAt > post2.createdAt ? -1 : 1)
    }
}

const mDTP = dispatch => {
    return {
        fetchUser: id => fetchUser(id)(dispatch),
        fetchWallFeed: id => dispatch(fetchWallFeed(id)),
        fetchUsers: users => dispatch(fetchUsers(users))
    }
}

export default connect(mSTP,mDTP)(Profile)