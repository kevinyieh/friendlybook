import { connect } from "react-redux"
import Comment from "./comment";
import { createComment, deleteComment, editComment } from "../../actions/comment_actions";
import { likeComment, unlikeComment } from "../../actions/like_actions";

const mSTP = (state, ownProps) => {
    let isLiked = false;
    const likes = ownProps.comment.likes ? Object.values(ownProps.comment.likes).length : 0;
    if(ownProps.comment.likes){
        isLiked = Object.values(ownProps.comment.likes).map( like => like.userId).includes(state.session.id)
    } 

    return {
        posts: state.entities.posts,
        currentUser: state.session,
        users: state.entities.users,
        isLiked,
        likes
    }
}

const mDTP = dispatch => {
    return {
        deleteComment: id => dispatch(deleteComment(id)),
        editComment: comment => dispatch(editComment(comment)),
        createComment: comment => dispatch(createComment(comment)),
        likeComment: id => likeComment(id)(dispatch),
        unlikeComment: id => unlikeComment(id)(dispatch)
    }
}

export default connect(mSTP,mDTP)(Comment);