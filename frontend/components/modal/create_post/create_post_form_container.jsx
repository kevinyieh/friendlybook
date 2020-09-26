import { connect } from "react-redux";
import { createPost } from "../../../actions/post_actions";
import CreatPostForm from "./create_post_form";

const mSTP = state => {
    return {
        modal: state.ui.modal
    }
}

const mDTP = dispatch => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default connect(mSTP,mDTP)(CreatPostForm);