import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { withRouter } from "react-router-dom";
import LoginForm from "./login_form";

const mSTP = state => {
    const modal = state.ui.modal;
    const errors = state.errors.session;
    return {
        modal,
        errors
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

export default withRouter(connect(mSTP,mDTP)(LoginForm));