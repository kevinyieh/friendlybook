export const RECEIVE_USERS = "RECEIVE_USERS";
import * as UserUtils from "../util/users_util"

const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const fetchUsers = users => dispatch => {
    return UserUtils.fetchUsers(users).then( fetchedUsers => dispatch(receiveUsers(fetchedUsers)))
}