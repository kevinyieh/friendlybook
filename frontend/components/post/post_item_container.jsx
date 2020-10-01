import { connect } from "react-redux";
import PostItem from "./post_item";
import { openModal } from "../../actions/modal_actions";
import { deletePost } from "../../actions/post_actions";
import { createComment } from "../../actions/comment_actions";
import { fetchUser } from "../../actions/user_actions";
import { likePost, unlikePost } from "../../actions/like_actions";

const mSTP = (state,ownProps) => {
    // const rootComments = ownProps.post.comments ? Object.values(ownProps.post.comments).filter( comment => !comment.source) : [];
    // const sortedComments = rootComments ? rootComments.sort((comment1,comment2) => comment1.createdAt > comment2.createdAt ? 1 : -1) : null;
    // const commentsToRender = sortedComments ? sortedComments.slice(rootComments.length-this.state.showComments,rootComments.length) : null;
    let isLiked = false;
    if(ownProps.post.likes){
        isLiked = Object.values(ownProps.post.likes).map( like => like.userId).includes(state.session.id)
    }
    return {
        currentUser: state.session,
        post: ownProps.post,
        poster: Object.assign(state.entities.users[ownProps.poster.id], ownProps.poster),
        postee: ownProps.postee,
        users: state.entities.users,
        isLiked
    }   
}

const mDTP = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        deletePost: id => dispatch(deletePost(id)),
        createComment: comment => dispatch(createComment(comment)),
        likePost: id => likePost(id)(dispatch),
        unlikePost: id => unlikePost(id)(dispatch)
    }
}

export default connect(mSTP,mDTP)(PostItem);