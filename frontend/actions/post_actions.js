import * as PostUtils from "../util/post_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";

const receivePosts = posts => {
    return{
        type: RECEIVE_POSTS,
        posts
    }
}
export const receivePost = post => {
    return{
        type: RECEIVE_POST,
        post
    }
}
const removePost = id => {
    return{
        type: REMOVE_POST,
        id
    }
}

export const fetchNewsfeed = () => dispatch => {
    return PostUtils.fetchNewsfeed()
        .then( posts => dispatch(receivePosts(posts)))
}

export const createPost = post => dispatch => {
    return PostUtils.createPost(post)
        .then( createdPost => dispatch(receivePost(createdPost)))
}

export const deletePost = id => dispatch => {
    return PostUtils.deletePost(id)
        .then( post => dispatch(removePost(post.id)))
}

export const editPost = id => dispatch => {
    return PostUtils.editPost(id)
        .then( post => dispatch(receivePost(post)))
}