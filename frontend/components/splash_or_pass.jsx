import React from "react";
import { connect } from "react-redux";
import SplashContainer from "./splash/splash_container";
import Home from "./home/home";

const mSTP = state => {
    return {
        loggedIn: Boolean(state.session.id)
    }
}

function SplashOrPass({ loggedIn }){
    return (
        <div>
            {loggedIn ? <Home /> : <SplashContainer />}
        </div>
    )
}

export default connect(mSTP)(SplashOrPass);