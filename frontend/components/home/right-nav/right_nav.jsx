import React from "react";
import { Link } from "react-router-dom";

export default class RightNav extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.fetchAllFriends({id: this.props.currentUser.id});
    }

    render(){
        return (
            <div className="right-spacer">
                <ul className="right-nav">
                    <div className="sponsored">
                        <h3> Sponsored </h3>
                    </div>
                        
                    <div className="separator" />
                    <div className="contacts">
                        <h3> Contacts </h3>
                    </div>
                    {
                        this.props.friends.map( friend => {
                            const fullName = `${friend.firstName} ${friend.lastName}`;
                            const pfp = friend.pfp ? friend.pfp : window.defaultPfp;
                            return <Link to={`/users/${friend.id}`} key={fullName} className="contact-container">
                                        <li className="contact">
                                            <div className="profile-pic-icon">
                                                <img src={pfp} />
                                            </div>
                                                
                                            <p> {fullName} </p>
                                        </li>
                                        <div className="contact-description">
                                            <i className="fas fa-user" />
                                            <p> {fullName} </p>
                                        </div>
                                    </Link>
                        })
                    }
                </ul>
            </div>
        )
            
    }
}