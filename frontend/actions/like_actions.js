import { receivePost } from "./post_actions";
import * as LikeUtils from "../util/like_util";

export const likePost = id => dispatch => {
    return LikeUtils.likePost(id)
        .then( post => dispatch(receivePost(post)) )
}

export const likeComment = id => dispatch => {
    return LikeUtils.likeComment(id)
        .then( post => dispatch(receivePost(post)) )
}

export const unlikePost = id => dispatch => {
    return LikeUtils.unlikePost(id)
        .then( post => dispatch(receivePost(post)) )
}
export const unlikeComment = id => dispatch => {
    return LikeUtils.unlikeComment(id)
        .then( post => dispatch(receivePost(post)) )
}