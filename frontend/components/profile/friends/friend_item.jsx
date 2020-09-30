import React from "react";
import { Link } from "react-router-dom";

export default class FriendItem extends React.Component{
    render(){
        const pfp = this.props.friend.pfp ? this.props.friend.pfp : window.defaultPfp;
        return (
            <Link className="friend-item" to={`/users/${this.props.friend.id}`}>
                <img className="small-friend" src={pfp} />
                <p> {`${this.props.friend.firstName} ${this.props.friend.lastName}`} </p>
            </Link>
        )
    }
}