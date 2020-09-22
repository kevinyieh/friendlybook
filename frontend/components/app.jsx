import React from "react";
import { Route,Switch } from "react-router-dom";
import SplashOrPass from "./splash_or_pass"
import LoginFormContainer from "./login/login_form_container";

export default function App(){
    return (
        <div>
            {/* <Route path="/login" component={LoginFormContainer}/> */}
            <Route path="/" component={SplashOrPass} />
        </div>
    )
}