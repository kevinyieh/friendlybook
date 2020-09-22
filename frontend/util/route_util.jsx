import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";

const mSTP = state => {
    return {
        loggedIn: Boolean(state.session.id)
    }
}

const Auth = ( { component: Component, path, loggedIn, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={props => {
                return loggedIn ? <Redirect to="/" /> : <Component {...props} />
            }} 
        />
    )
}

const Protected = ( { component: Component, path, loggedIn, exact }) => {
    return (
        <Route 
            path={path}
            exact={exact}
            render={props => {
                return loggedIn ? <Component {...props} /> :  <Redirect to="/login" />
            }}
        />
    )
}

export const AuthRoute = withRouter(
    connect(mSTP)(Auth)
)

export const ProtectedRoute = withRouter(
    connect(mSTP)(Protected)
)