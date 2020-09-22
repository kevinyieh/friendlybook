import React from "react";
import LoginFormContainer from "./login_form_container";

export default function LoginPage({location}) {
    return (
        <div className="login-page">
            <LoginFormContainer location={location}/>
        </div>
    )
}