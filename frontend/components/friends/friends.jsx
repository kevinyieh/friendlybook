import React from "react";
import NavBarContainer from "../home/navbar/navbar_container";
import ProfileContainer from "../profile/profile_container";
import FriendReqItem from "./friend_req_item";

export default class Friends extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profileSelected: null,
        }
        this.handleMount = this.handleMount.bind(this);
        this.renderFriendRequests = this.renderFriendRequests.bind(this);
        this.renderFriendRequestsHelper = this.renderFriendRequestsHelper.bind(this);
        this.updateProfileSelected = this.updateProfileSelected.bind(this);
    }
    handleMount(){
        this.setState({
            profileSelected: null
        })
    }
    componentDidMount(){
        this.props.fetchFriendRequests().then(this.handleMount)
    }
    componentDidUpdate() {
        let allUsers = [];
        Object.values(this.props.friendRequests).forEach( req => {
            if(!this.props.users[req.userId]){
                allUsers.push(req.userId);
            }else if(!this.props.users[req.friendId]){
                allUsers.push(req.friendId);
            }
        })
        if (allUsers.length > 0) this.props.fetchUsers(allUsers);
    }

    updateProfileSelected(id){
        return e => {
            e.preventDefault();
            this.setState({
                profileSelected: id
            })
        }
    }
    renderProfile(){
        if(!this.state.profileSelected) return null;
        return(
            <div className="friends-profile">
                <ProfileContainer 
                    profileSelected={this.state.profileSelected}
                    friendView={true}
                />
            </div>
        )

    }
    renderFriendRequestsHelper(req){
        const user = this.props.users[req.userId];
        if(!user) return null;
        const pfp = user.pfp ? user.pfp : window.defaultPfp;
        return <FriendReqItem 
                    key={req.id}
                    user={user}
                    pfp={pfp}
                    id={req.id}
                    updateProfileSelected={this.updateProfileSelected}
                    acceptFriendRequest={this.props.acceptFriendRequest}
                    rejectFriendRequest={this.props.rejectFriendRequest}
                />
    }
    renderFriendRequests(){
        return(
            <ul className="friend-req-list">
                {this.props.receives.map(this.renderFriendRequestsHelper)}
            </ul>
        )
    }

    render(){
        return(
            <div>
                <NavBarContainer /> 
                <div className="spacer"/>
                
                <div className="friends-container">
                    <div className="friends-nav-spacer">
                        <div className="friends-nav">
                            <h1> Friends </h1>
                            <div className="separator" />
                            <h3> {`${this.props.receives.length} ${this.props.receives.length > 1 ? "Friend Requests" : "Friend Request"}`}  </h3>
                            <p> View sent requests </p>
                            {this.renderFriendRequests()}
                        </div>
                    </div>
                    {this.renderProfile()}
                </div>
                
            </div>
        )
    }
}
