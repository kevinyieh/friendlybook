import React from "react";
import LoginFormContainer from "../login/login_form_container";
import { Redirect } from "react-router-dom";

export default function Splash({errors}) {
    if(errors.length > 0) return <Redirect to="/login" />
    
    return (
        <div className="splash">
            <div className="splash-container">
                <div className="splash-main">
                    <div className="splash-greeting">
                        <img src={window.logoUrl} />
                        <h1>
                            Connect with friends and the world around you on Friendlybook.
                        </h1>
                    </div>
                    <LoginFormContainer />
                </div>
                
            </div>
            <div className="footer fine-print">
                <div> English (US) </div>
                <div className="separator" />
            </div>
        </div>
    )    
}