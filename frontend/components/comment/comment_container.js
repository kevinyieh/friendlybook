import { connect } from "react-redux"
import Comment from "./comment";
import { deleteComment, editComment } from "../../actions/comment_actions";
const mSTP = (state, ownProps) => {
    return {
        posts: state.entities.posts,
        currentUser: state.session,
        users: state.entities.users,
        comment: ownProps.comment,
        subComments: ownProps.subComments
    }
}

const mDTP = dispatch => {
    return {
        deleteComment: id => dispatch(deleteComment(id)),
        editComment: comment => dispatch(editComment(comment))
    }
}

export default connect(mSTP,mDTP)(Comment);