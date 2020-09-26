import { connect } from "react-redux";
import Newsfeed from "./newsfeed";
import { fetchNewsfeed } from "../../../actions/post_actions";
import { fetchUsers } from "../../../actions/user_actions";
// 
const mSTP = state => {
    return {
        posts: Object.values(state.entities.posts).sort( (post1,post2) => post1.createdAt > post2.createdAt ? -1 : 1),
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