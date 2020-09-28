import { receivePost } from "./post_actions";
import * as CommentUtil from "../util/comment_util";

export const createComment = comment => dispatch => {
    return CommentUtil.createComment(comment)
        .then( (post) => dispatch(receivePost(post)))
}

export const deleteComment = id => dispatch => {
    return CommentUtil.deleteComment(id)
        .then( (post) => dispatch(receivePost(post)))
}

export const editComment = comment => dispatch => {
    return CommentUtil.editComment(comment)
        .then( (post) => dispatch(receivePost(post)))
}