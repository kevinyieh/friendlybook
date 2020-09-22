import React from "react";
import { Route,Switch } from "react-router-dom";
import SplashOrPass from "./splash_or_pass"
import LoginPage from "./login/login";

export default function App(){
    return (
        <div>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/" component={SplashOrPass} />
            </Switch>
        </div>
    )
}