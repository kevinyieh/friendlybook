import { combineReducers } from "redux"
import sessionReducer from "./session/session_reducer";
import errorsReducer from "./errors_reducer";
import uiReducer from "./ui/ui_reducer";

export default combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    ui: uiReducer
})