import React from "react";
import { Route,Switch, withRouter } from "react-router-dom";
import SplashOrPass from "./splash_or_pass"
import LoginPage from "./login/login";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import ProfileContainer from "./profile/profile_container";
import FriendsContainer from "./friends/friends_container";

function App(){
    return (
        <div>
            <div id="backdrop" />
            <Switch>
                <AuthRoute path="/login" component={LoginPage}/>
                <ProtectedRoute path="/users/:userId" component={ProfileContainer} />
                <ProtectedRoute path="/friends" component={FriendsContainer} />
                <Route path="/" component={SplashOrPass} />
            </Switch>
        </div>
    )
}

export default withRouter(App);