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
            reqId: null,
            friendsFetched: false
        }
        this.handleCreateFriendRequest = this.handleCreateFriendRequest.bind(this);
        this.handleAcceptFriendRequest = this.handleAcceptFriendRequest.bind(this);
        this.handleRejectFriendRequest = this.handleRejectFriendRequest.bind(this);
        this.handleDeleteFriend = this.handleDeleteFriend.bind(this);
        this.handlePfpChange = this.handlePfpChange.bind(this);
        this.handleWallpaperChange = this.handleWallpaperChange.bind(this);
    }
    componentDidMount(){
        this.props.fetchWallFeed(this.props.userId).then(() => {
            this.props.fetchUsers(this.allUserIdsFromComments(this.props.posts))
        });

        this.props.fetchFriendRequests();  
        this.props.fetchAllFriends({id: this.props.userId}).then( () => {
            this.setState({
                friendsFetched: true
            })
        });
    }
    componentDidUpdate(prevProps,prevState){
        if(!this.props.user) this.props.fetchUser(this.props.userId);

        if(prevProps.match.params.userId !== this.props.match.params.userId){
            this.setState({
                friendsFetched: false
            },() => this.props.fetchAllFriends({id: this.props.userId}).then( () => {
                this.setState({
                    friendsFetched: true
                })
            }))
        }
    }
    renderBackground(){
        if(this.props.user.wallpaper){
            return <img src={this.props.user.wallpaper} />
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
    handleDeleteFriend(e) {
        e.preventDefault();
        this.props.deleteFriend(this.props.userId);
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
    renderAddFriend(isFriend){
        if(!this.state.friendsFetched) return null;
        if(this.props.rec.length === 1 || this.props.req.length === 1) return null;
        if (isFriend) {
            return (
                <button onClick={this.handleDeleteFriend} className="profile-add-friend"> 
                    <div className="add-friend-icon">
                        <i className="fas fa-user-minus" />
                    </div>
                    <p> Unfriend </p>
                </button>
            )
        }
        return (
            <button onClick={this.handleCreateFriendRequest} className="profile-add-friend"> 
                <div className="add-friend-icon">
                    <i className="fas fa-user-plus" />
                </div>
                <p>Add Friend </p>
            </button>
        )
    }
    handlePfpChange(e){
        e.preventDefault();
        if(e.target.files[0]){
            const formData = new FormData();
            formData.append("pfp",e.target.files[0]);
            return this.props.uploadPfp(formData);
        }
    }
    handleWallpaperChange(e){
        e.preventDefault();
        if(e.target.files[0]){
            const formData = new FormData();
            formData.append("wallpaper",e.target.files[0]);
            return this.props.uploadWallpaper(formData);
        }
    }

    renderEditPfp(){
        if(this.props.userId !== this.props.currentUser.id) return null;
        if(!this.state.friendsFetched) return null;
        return(
            <label className="pfp-upload-input">
                <input onChange={this.handlePfpChange} type="file" />
                <i className="fas fa-camera-retro" />
            </label>    
        )
    }
    renderEditWallpaper(){
        if(this.props.userId !== this.props.currentUser.id) return null;
        if(!this.state.friendsFetched) return null;
        return(
            <label className="wallpaper-upload-input">
                <input onChange={this.handleWallpaperChange} type="file" />
                <i className="fas fa-camera-retro" />
                <p>Edit Cover Photo</p>
            </label>
        )
    }


    render(){
        if(!this.props.user) return null;
        const pfp = this.props.user.pfp ? this.props.user.pfp : window.defaultPfp;
        const isFriend = !!this.props.friends[this.props.currentUser.id] || 
                            this.props.rec.length === 1 || 
                            this.props.req.length === 1 || 
                            this.props.userId === this.props.currentUser.id;
        
        return(
            <div className="profile-page-container">
                {this.renderNavbar()}
                <div className="profile-page-header">
                    <div className="profile-background-image">
                        {this.renderBackground()}
                        {this.renderEditWallpaper()}
                    </div>
                    <div className="profile-page-pfp-container">
                        <div className="profile-page-pfp">
                            <img src={pfp} />
                            {this.renderEditPfp()}
                        </div>
                    </div>
                    <h1 className="profile-name"> 
                        {`${this.props.user.firstName} ${this.props.user.lastName}`} 
                        {this.renderAddFriend(isFriend)}
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
                            friends={this.props.friends}
                            friendsFetched={this.state.friendsFetched}
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