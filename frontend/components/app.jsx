import React from "react";
import { Route,Switch } from "react-router-dom";
import SplashOrPass from "./splash_or_pass"
import LoginPage from "./login/login";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default function App(){
    return (
        <div>
            <Switch>
                <AuthRoute path="/login" component={LoginPage}/>
                <Route path="/" component={SplashOrPass} />
            </Switch>
        </div>
    )
}