import { receivePost } from "./post_actions";
import * as CommentUtil from "../util/comment_util";

export const createComment = comment => dispatch => {
    return CommentUtil.createComment(comment)
        .then( (post) => dispatch(receivePost(post)))
}