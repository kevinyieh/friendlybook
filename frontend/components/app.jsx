import React from "react";
import { Route,Switch, withRouter } from "react-router-dom";
import SplashOrPass from "./splash_or_pass"
import LoginPage from "./login/login";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Profile from "./profile/profile"

function App(){
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/users/:userId" component={Profile} />
                <AuthRoute path="/login" component={LoginPage}/>
                <Route path="/" component={SplashOrPass} />
            </Switch>
        </div>
    )
}

export default withRouter(App);