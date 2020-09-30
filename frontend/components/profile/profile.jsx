import React from "react";
import { withRouter } from "react-router-dom";
import NavBarContainer from "../home/navbar/navbar_container";
import WallFeedContainer from "./wall_feed/wall_feed_container";
import MiniPhotosContainer from "./photos/mini_photos";
import MiniFriendsContainer from "./friends/mini_friends_container";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFriend:this.props.isFriend,
            reqId: null
        }
        this.handleCreateFriendRequest = this.handleCreateFriendRequest.bind(this);
        this.handleAcceptFriendRequest = this.handleAcceptFriendRequest.bind(this);
        this.handleRejectFriendRequest = this.handleRejectFriendRequest.bind(this);
    }
    componentDidMount(){
        this.props.fetchWallFeed(this.props.userId).then(() => {
            this.props.fetchUsers(this.allUserIdsFromComments(this.props.posts))
        });
        this.props.fetchFriendRequests();        
    }
    componentDidUpdate(){
        if(!this.props.user) this.props.fetchUser(this.props.userId);
    }
    renderBackground(){
        if(this.props.currentUser.background){
            return <img src={this.props.user.background} />
        }else{
            return <div className="default-background" />
        }
    }
    renderNavbar(){
        if(this.props.friendView) return null;
        return (
            <div>
                    <NavBarContainer /> 
                    <div className="spacer"/>
            </div>
        )
    }
    allUserIdsFromComments(posts){
        let allUsers = {};
        posts.forEach( (post) => {
            allUsers[post.userId] = true
            if(post.comments){
                Object.values(post.comments).forEach( (comment) => {
                    if(comment.subComments){
                        Object.values(comment.subComments).forEach( (subComment) => {
                            allUsers[subComment.userId] = true;
                        })
                    }
                    allUsers[comment.userId] = true;
                })
            }
        })
        return Object.keys(allUsers);
    }
    handleCreateFriendRequest(e){
        e.preventDefault();
        this.props.createFriendRequest(this.props.user.id);
    }
    handleRejectFriendRequest(e){
        e.preventDefault();
        this.props.rejectFriendRequest(this.props.reqId);
    }
    handleAcceptFriendRequest(e){
        e.preventDefault();
        this.props.acceptFriendRequest(this.props.reqId);
    }
    renderFriendRequestButton(){
        const {rec,req} = this.props;
        if(rec.length === 1){
            return (
                <div className="profile-friend-request-container">
                    <h2> {`${this.props.user.firstName} sent you a friend request`} </h2>
                    <div className="profile-confirm-delete-request">
                        <button onClick={this.handleAcceptFriendRequest} className="profile-confirm-request"> Confrim Request </button>
                        <button onClick={this.handleRejectFriendRequest} className="profile-delete-request"> Delete Request </button>
                    </div>
                </div>)
        }else if(req.length === 1){
            return (
                <div className="profile-friend-request-container">
                    <h2> {`You sent a friend request`} </h2>
                    <div className="profile-confirm-delete-request">
                        <button onClick={this.handleRejectFriendRequest} className="profile-delete-request"> Cancel Request </button>
                    </div>
                </div>
            )
        }
    }
    renderAddFriend(){
        if(this.props.isFriend) return null;
        return (
            <button onClick={this.handleCreateFriendRequest} className="profile-add-friend"> 
                <div className="add-friend-icon">
                    <i className="fas fa-user-plus" />
                </div>
                <p>Add Friend </p>
            </button>
        )
    }
    render(){
        if(!this.props.user) return null;
        const pfp = this.props.user.pfp ? this.props.user.pfp : window.defaultPfp;
        return(
            <div className="profile-page-container">
                {this.renderNavbar()}
                <div className="profile-page-header">
                    <div className="profile-background-image">
                        {this.renderBackground()}
                    </div>
                    <div className="profile-page-pfp-container">
                        <div className="profile-page-pfp">
                            <img src={pfp} />
                        </div>
                    </div>
                    <h1 className="profile-name"> 
                        {`${this.props.user.firstName} ${this.props.user.lastName}`} 
                        {this.renderAddFriend()}
                    </h1>
                    <div className="separator" />
                    <ul className="profile-page-nav">
                        <li> <p>Timeline</p> </li>
                        <li> <p>Friends</p> </li>
                        <li> <p>Photos</p> </li>
                    </ul>
                </div>
                {this.renderFriendRequestButton()}
                <div className="profile-page-body">
                    <div className="profile-photos-friends-container">
                        <MiniPhotosContainer 
                            photos={this.props.user.photos}
                        />
                        <MiniFriendsContainer
                            user={this.props.user}
                        />
                    </div>
                        
                    <WallFeedContainer 
                        user={this.props.user}
                        posts={this.props.posts}
                        />
                </div>
            </div>
        )
    }
        
}

export default withRouter(Profile);