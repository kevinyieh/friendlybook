import { connect } from "react-redux";
import { createPost } from "../../../actions/post_actions";
import CreatPostForm from "./create_post_form";
import { closeModal }  from "../../../actions/modal_actions";

const mSTP = (state, ownProps) => {
    const currentUser = state.session
    return {
        modal: state.ui.modal,
        currentUser,
        wallId: ownProps.wallId
    }
}

const mDTP = dispatch => {
    return {
        createPost: (post) => createPost(post)(dispatch),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP,mDTP)(CreatPostForm);