export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
import * as UserUtils from "../util/users_util"

const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}
const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}
export const fetchUsers = users => dispatch => {
    return UserUtils.fetchUsers(users).then( fetchedUsers => dispatch(receiveUsers(fetchedUsers)))
}

export const fetchUser = id => dispatch => {
    return UserUtils.fetchUser(id).then (fetchedUser => dispatch(receiveUser(fetchedUser)))
}