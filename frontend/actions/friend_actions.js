import * as FriendUtil from "../util/friend_util";

export const RECEIVE_ALL_FRIENDS = "RECEIVE_ALL_FRIENDS";

const receiveAllFriends = friends => {
    return {
        type: RECEIVE_ALL_FRIENDS,
        friends
    }
}

export const fetchAllFriends = user => dispatch => {
    return FriendUtil.fetchFriends(user)
        .then((friends) => dispatch(receiveAllFriends(friends)))
}