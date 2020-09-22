import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

import Splash from "./splash";

const mSTP = state => {
    const modal = state.ui.modal;
    return {
        modal
    }
}

const mDTP = dispatch => {
    return {
        login: (user) => {
            return dispatch(login(user));
        },
        signup: (user) => {
            return dispatch(signup(user));
        },
        openModal: (modal) => {
            return dispatch(openModal(modal));
        },
        closeModal: () => {
            return dispatch(closeModal());
        }
    }
}

export default connect(mSTP,mDTP)(Splash);