import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../../actions/session_actions.js";

const _nullState = {
    id: null
}

export default function sessionReducer(state=_nullState, action){
    Object.freeze(state);
    console.log(action);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return { id: action.user.id, pronoun: action.user.pronoun.split("/") }
        case LOGOUT_CURRENT_USER:
            return _nullState
        default:
            return state;
    }
}