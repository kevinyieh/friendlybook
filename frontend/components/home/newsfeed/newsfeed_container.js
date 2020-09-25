import { connect } from "react-redux";
import Newsfeed from "./newsfeed";
import { fetchNewsfeed } from "../../../actions/post_actions";

const mSTP = state => {
    return {
        posts: state.entities.posts,
        users: state.entities.users
    }
}
const mDTP = dispatch => {
    return {
        fetchNewsfeed: () => dispatch(fetchNewsfeed())
    }
}

export default connect(mSTP,mDTP)(Newsfeed);