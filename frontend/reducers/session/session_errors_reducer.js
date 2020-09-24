import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from "../../actions/session_actions";

const emptyErrors = {
    login:{},
    signup:{}
}

function sessionErrorsReducer(state=emptyErrors, action){
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return emptyErrors;
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export default sessionErrorsReducer;