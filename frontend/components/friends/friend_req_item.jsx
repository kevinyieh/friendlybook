import React from "react";

export default class FriendReqItem extends React.Component{
    constructor(props){
        super(props);
        this.handleAcceptReq = this.handleAcceptReq.bind(this);
        this.handleRejectReq = this.handleRejectReq.bind(this);
    }
    handleAcceptReq(e){
        this.props.acceptFriendRequest(this.props.id)
    }
    handleRejectReq(e){
        this.props.rejectFriendRequest(this.props.id)
    }
    render(){
        const {pfp,user} = this.props;
        return(
            <li onClick={this.props.updateProfileSelected(user.id)} >  
                <img className="friend-req-pfp" src={pfp} />
                <div className="friend-req-description">
                    <p className="friend-req-name"> {`${user.firstName} ${user.lastName}`} </p>
                    <div className="friend-req-confirm-delete">
                        <button className="friend-req-confirm"
                                onClick={this.handleAcceptReq}> 
                                    <p>Confirm</p> 
                        </button>
                        <button className="friend-req-delete"
                                onClick={this.handleRejectReq}> 
                                <p>Delete</p> 
                        </button>
                    </div>
                </div>
            </li>
        )

    }
}