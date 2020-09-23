import React from "react";
import NavBarContainer from "./navbar/navbar_container";

export default class Home extends React.Component{
    render(){
        return(
            <div className="homepage">
                <NavBarContainer /> 
                <div>
                    Home Page.
                </div>
            </div>
        )
    }
}