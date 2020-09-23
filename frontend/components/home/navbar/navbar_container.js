import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";
import NavBar from "./navbar";
const mSTP = state => {
    const currentUser = state.session
    return {
        currentUser
    }
}

const mDTP  = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        }
    }
}

export default connect(mSTP,mDTP)(NavBar);