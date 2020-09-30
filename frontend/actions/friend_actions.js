import * as FriendUtil from "../util/friend_util";

export const RECEIVE_ALL_FRIENDS = "RECEIVE_ALL_FRIENDS";
export const RECEIVE_ALL_FRIEND_REQUESTS = "RECEIVE_ALL_FRIEND_REQUESTS";

const receiveAllFriends = friends => {
    return {
        type: RECEIVE_ALL_FRIENDS,
        friends
    }
}

const receiveAllFriendRequests = friendRequests => {
    return {
        type: RECEIVE_ALL_FRIEND_REQUESTS,
        friendRequests
    }
}

export const fetchAllFriends = user => dispatch => {
    return FriendUtil.fetchFriends(user)
        .then((friends) => dispatch(receiveAllFriends(friends)))
}

export const fetchFriendRequests = () => dispatch => {
    return FriendUtil.fetchFriendRequests()
        .then(friendRequests => dispatch(receiveAllFriendRequests(friendRequests)))
}

export const acceptFriendRequest = id => dispatch => {
    return FriendUtil.acceptFriendRequest(id)
        .then(friendRequests => dispatch(receiveAllFriendRequests(friendRequests)))
}

export const rejectFriendRequest = id => dispatch => {
    return FriendUtil.rejectFriendRequest(id)
        .then(friendRequests => dispatch(receiveAllFriendRequests(friendRequests)))
}