import React from "react";
import { withRouter } from "react-router-dom";
import NavBarContainer from "../home/navbar/navbar_container";
import WallFeedContainer from "./wall_feed/wall_feed_container";
import MiniPhotosContainer from "./photos/mini_photos";
class Profile extends React.Component{
    componentDidMount(){
        // this.props
    }
    renderBackground(){
        if(this.props.currentUser.background){
            return <img src={this.props.user.background} />
        }else{
            return <div className="default-background" />
        }
    }
    render(){
        if(!this.props.user) return null;
        const pfp = this.props.user.pfp ? this.props.user.pfp : window.defaultPfp;
        return(
            <div className="profile-page-container">
                <NavBarContainer /> 
                <div className="spacer"/>
                <div className="profile-page-header">
                    <div className="profile-background-image">
                        {this.renderBackground()}
                    </div>
                    <div className="profile-page-pfp-container">
                        <div className="profile-page-pfp">
                            <img src={pfp} />
                        </div>
                    </div>
                    <h1 className="profile-name"> {`${this.props.user.firstName} ${this.props.user.lastName}`} </h1>
                    <div className="separator" />
                    <ul className="profile-page-nav">
                        <li> <p>Timeline</p> </li>
                        <li> <p>Friends</p> </li>
                        <li> <p>Photos</p> </li>
                    </ul>
                </div>
                <div className="profile-page-body">
                    <MiniPhotosContainer />
                    <WallFeedContainer />
                </div>
            </div>
        )
    }
        
}

export default withRouter(Profile);