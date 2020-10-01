import { connect } from "react-redux";
import { createPost, editPost } from "../../../actions/post_actions";
import CreatPostForm from "./post_form";
import { closeModal }  from "../../../actions/modal_actions";
import { withRouter } from "react-router-dom";
const mSTP = (state, ownProps) => {
    const currentUser = state.session;
    const modal = state.ui.modal ? state.ui.modal.type : null;
    const postId = state.ui.modal ? state.ui.modal.postId : null;
    return {
        modal,
        currentUser,
        postId,
        wallId: ownProps.wallId,
        posts: state.entities.posts,
    }
}

const mDTP = (dispatch) => {
    return {
        createPost: (post) => createPost(post)(dispatch),
        editPost: (post) => editPost(post)(dispatch),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(mSTP,mDTP)(CreatPostForm));