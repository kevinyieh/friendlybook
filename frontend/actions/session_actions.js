import * as UserUtil from "../util/users";
// import { Redirect } from "react-router-dom";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    }
}

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    }
}

const receiveErrors = errors => {
    errors = errors.responseJSON;
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}

export const login = user => dispatch => {
    UserUtil.login(user)
        .then(payload => dispatch(receiveCurrentUser(payload)),
            errors => {
                dispatch(receiveErrors(errors));
            }
        )
};

export const logout = () => dispatch => {
    UserUtil.logout()
        .then(payload => dispatch(logoutCurrentUser(payload)),
            errors => dispatch(receiveErrors(errors))
        )
};

export const signup = user => dispatch => {
    const userParams = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        birthdate: `${user.year}/${user.month}/${user.day}`,
        gender: user.gender,
        pronoun: user.pronoun
    };
    UserUtil.signup(userParams)
        .then(payload => {
            return dispatch(receiveCurrentUser(payload))
        },
            errors => dispatch(receiveErrors(errors))
        )
};