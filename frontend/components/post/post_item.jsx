import React from "react";
import { timeRender } from "../../util/time_util";
import { Link } from "react-router-dom";
export default class PostItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="post-container">
                    <div className="post-header">
                        <div className="profile-pic-icon">
                            <i className="fas fa-user" />
                        </div>
                        <div className="post-technicals">
                            <div className="post-user">
                                {this.props.poster.id !== this.props.postee.id ? 
                                    <div className="post-user-content"> 
                                        <Link to={`/users/${this.props.poster.id}`}>{this.props.poster.fullName}</Link>
                                        &nbsp;
                                        <div className="fa-icon-container">
                                            <i className="fas fa-caret-right"/> 
                                        </div>
                                        &nbsp;
                                        <Link to={`/users/${this.props.postee.id}`}>{this.props.postee.fullName}</Link>
                                    </div>  : 
                                    <div> 
                                        <Link to={`/users/${this.props.poster.id}`}>{this.props.poster.fullName}</Link>
                                    </div>}
                            </div>
                            <div className="post-time">
                                {timeRender(this.props.post.createdAt)}
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        {this.props.post.post}
                    </div>
            </div>
        )
            
    }
}