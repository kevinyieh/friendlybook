import { RECEIVE_ALL_FRIEND_REQUESTS } from "../../../actions/friend_actions";

export default function friendRequestsReducer(state={}, action){
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ALL_FRIEND_REQUESTS:
            return action.friendRequests
        default:
            return state;
    }
}