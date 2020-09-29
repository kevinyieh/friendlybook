import { connect } from "react-redux";
import WallFeed from "./wall_feed";
import { openModal } from "../../../actions/modal_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { fetchWallFeed } from "../../../actions/post_actions"
const mSTP = (state,ownProps) => {
    return {
        posts: Object.values(state.entities.posts).sort( (post1,post2) => post1.createdAt > post2.createdAt ? -1 : 1),
        users: state.entities.users,
        currentUser: state.session,
        user: ownProps.user
    }
}
const mDTP = dispatch => {
    return {
        fetchWallFeed: (id) => fetchWallFeed(id)(dispatch),
        fetchUsers: (users) => fetchUsers(users)(dispatch),
        openModal: (modal) => dispatch(openModal(modal))
    }
}
export default connect(mSTP,mDTP)(WallFeed);