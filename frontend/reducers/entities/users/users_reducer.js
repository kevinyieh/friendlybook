import { RECEIVE_ALL_FRIENDS } from "../../../actions/friend_actions";
import { RECEIVE_CURRENT_USER } from "../../../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../../../actions/user_actions";

export default function usersReducer(state={},action){
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ALL_FRIENDS:
            return Object.assign({},state,action.friends)
        case RECEIVE_CURRENT_USER:
            return Object.assign({},state,{[action.user.id]: action.user})
        case RECEIVE_USERS:
            return Object.assign({},state,action.users)
        case RECEIVE_USER:
            return Object.assign({},state,{[action.user.id]: action.user})
        default:
            return state;
    }
}