import { connect } from "react-redux";
import Newsfeed from "./newsfeed";
import { fetchNewsfeed } from "../../../actions/post_actions";
import { fetchUsers } from "../../../actions/user_actions";

const mSTP = state => {
    return {
        posts: state.entities.posts,
        users: state.entities.users
    }
}
const mDTP = dispatch => {
    return {
        fetchNewsfeed: () => fetchNewsfeed()(dispatch),
        fetchUsers: (users) => fetchUsers(users)(dispatch)
    }
}

export default connect(mSTP,mDTP)(Newsfeed);