import * as PostUtils from "../util/post_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS"

const receivePosts = posts => {
    return{
        type: RECEIVE_POSTS,
        posts
    }
}

export const fetchNewsfeed = () => dispatch => {
    return PostUtils.fetchNewsfeed()
        .then( posts => dispatch(receivePosts(posts)))
}