import React from "react";
import FriendItem from "./friend_item";

export default class MiniFriends extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchAllFriends({id: this.props.user.id});
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id) this.props.fetchAllFriends({id: this.props.user.id});
    }
    renderFriendsRow(row){
        return (
            <ul className="small-friends-list">
                {row.map( (friend,i) => <FriendItem 
                                            friend={friend}
                                            key={i}
                                        />)}
            </ul>
        )
    }
    renderFriends(friends){
        const row1= friends.slice(0,3);
        const row2= friends.slice(3,6);
        const row3= friends.slice(6,9);
        return (
            <div className="mini-friends-container">
                {row1.length > 0 ? <div className="small-friends-row"> {this.renderFriendsRow(row1,0)} </div> : null}
                {row2.length > 0 ? <div className="small-friends-row"> {this.renderFriendsRow(row2,1)} </div> : null} 
                {row3.length > 0 ? <div className="small-friends-row"> {this.renderFriendsRow(row3,2)} </div> : null}
            </div>
        )
    }
    render(){
        return (
            <div className="profile-friends-section">
                <h2> Friends </h2>
                {this.renderFriends(this.props.friends)}
            </div>
        )
    }
}