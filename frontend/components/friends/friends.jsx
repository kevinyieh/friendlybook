import React from "react";
import NavBarContainer from "../home/navbar/navbar_container";
import ProfileContainer from "../profile/profile_container";

export default class Friends extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profileSelected: null,
            requests: [],
            receives: []
        }
        this.handleMount = this.handleMount.bind(this);
        this.renderFriendRequests = this.renderFriendRequests.bind(this);
        this.renderFriendRequestsHelper = this.renderFriendRequestsHelper.bind(this);
        this.updateProfileSelect = this.updateProfileSelect.bind(this);
    }
    handleMount(){
        debugger;
        if(this.props.friendRequests){
            const requests = Object.values(this.props.friendRequests).filter( req => req.userId === this.props.currentUser.id ).sort((r1,r2) => r1.createdAt > r2.createdAt ? -1 : 1);
            const receives = Object.values(this.props.friendRequests).filter( req => req.friendId === this.props.currentUser.id ).sort((r1,r2) => r1.createdAt > r2.createdAt ? -1 : 1);
            this.setState({
                profileSelected: null,
                requests,
                receives
            })
        }
    }
    componentDidMount(){
        this.props.fetchFriendRequests().then(this.handleMount)
    }
    componentDidUpdate(prevProps) {
        let allUsers = [];
        let newRequests = false;
        Object.values(this.props.friendRequests).forEach( req => {
            if(!this.props.users[req.userId]){
                allUsers.push(req.userId);
            }else if(!this.props.users[req.friendId]){
                allUsers.push(req.friendId);
            }
        })
        if (allUsers.length > 0) this.props.fetchUsers(allUsers);
    }

    updateProfileSelect(e){
        e.preventDefault();
        this.setState({
            profileSelected: parseInt(e.currentTarget.getAttribute("value"))
        })
    }
    renderProfile(){
        if(!this.state.profileSelected) return null;
        debugger;
        return(
            <div className="friends-profile">
                <ProfileContainer 
                    profileSelected={this.state.profileSelected}
                    friendView={true}
                />
            </div>
        )

    }
    renderFriendRequestsHelper(rec,i){
        const user = this.props.users[rec.userId];
        if(!user) return null;
        const pfp = user.pfp ? user.pfp : window.defaultPfp;
        return (
                <li onClick={this.updateProfileSelect} value={user.id} key={i}>  
                    <img className="friend-req-pfp" src={pfp} />
                    <div className="friend-req-description">
                        <p className="friend-req-name"> {`${user.firstName} ${user.lastName}`} </p>
                        <div className="friend-req-confirm-delete">
                            <button className="friend-req-confirm"> <p>Confirm</p> </button>
                            <button className="friend-req-delete"> <p>Delete</p> </button>
                        </div>
                    </div>
                </li>
                )
    }
    renderFriendRequests(){
        return(
            <ul className="friend-req-list">
                {this.state.receives.map(this.renderFriendRequestsHelper)}
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
                            <h3> {`${this.state.receives.length} ${this.state.receives.length > 1 ? "Friend Requests" : "Friend Request"}`}  </h3>
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
