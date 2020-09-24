import React from "react";
import NavBarContainer from "./navbar/navbar_container";
import LeftNavContainer from "./left-nav/left_nav_container";
import RightNavContainer from "./right-nav/right_nav_container";
import NewsFeed from "./newsfeed/newsfeed_container";

export default class Home extends React.Component{
    render(){
        return(
            <div className="home">
                <NavBarContainer /> 
                <div className="spacer"/>

                <div className="home-main">
                    <LeftNavContainer />
                    <div className="homepage">
                        <NewsFeed />
                    </div>
                    <RightNavContainer />
                </div>
                    
            </div>
        )
    }
}