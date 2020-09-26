import { connect } from "react-redux";
import Newsfeed from "./newsfeed";
import { fetchNewsfeed } from "../../../actions/post_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { openModal } from "../../../actions/modal_actions";

const mSTP = state => {
    return {
        posts: Object.values(state.entities.posts).sort( (post1,post2) => post1.createdAt > post2.createdAt ? -1 : 1),
        users: state.entities.users,
        currentUser: state.session
    }
}
const mDTP = dispatch => {
    return {
        fetchNewsfeed: () => fetchNewsfeed()(dispatch),
        fetchUsers: (users) => fetchUsers(users)(dispatch),
        openModal: (modal) => dispatch(openModal(modal))
    }
}

export default connect(mSTP,mDTP)(Newsfeed);