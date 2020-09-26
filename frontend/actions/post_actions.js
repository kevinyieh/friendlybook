import * as PostUtils from "../util/post_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST"

const receivePosts = posts => {
    return{
        type: RECEIVE_POSTS,
        posts
    }
}
const receivePost = post => {
    return{
        type: RECEIVE_POST,
        post
    }
}

export const fetchNewsfeed = () => dispatch => {
    return PostUtils.fetchNewsfeed()
        .then( posts => dispatch(receivePosts(posts)))
}

export const createPost = (post) => dispatch => {
    return PostUtils.createPost(post)
        .then( createdPost => dispatch(receivePost(createdPost)))
}