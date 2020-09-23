import React from "react";
import AccountDropdown from "./right-side/account_dropdown";

export default function NavBar({ logout }){
    return (
        <div className="navbar">
            <div className="search">
                <img className="small-logo" src={window.smallLogoUrl}></img>
            </div>

            <div className="main-nav">
                <div>
                    Middle Stuff
                </div>
            </div>

            <div className="tools">
                <AccountDropdown logout={logout}/>
            </div>
        </div>
    )
}