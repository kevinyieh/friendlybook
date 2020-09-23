import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";
import NavBar from "./navbar";
const mSTP = state => {
    return {
        
    }
}

const mDTP  = dispatch => {
    return {
        logout: () => {
            return dispatch(logout);
        }
    }
}

return connect(undefined,mDTP)(NavBar);