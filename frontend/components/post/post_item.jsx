import React from "react";
import { timeRender } from "../../util/time_util";
import { Link } from "react-router-dom";
import CommentContainer from "../comment/comment_container";

export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        const comments = this.props.post.comments ? Math.min(Object.values(this.props.post.comments).length, 2) : 0
        this.state = {
            comments: comments
        }
        this.showInc = Math.min(10,this.props.post.totalComments - this.state.comments)
    }
    renderComments(){
        if(!this.props.post.comments) return null;
        let comments = Object.values(this.props.post.comments);
        let allComments = [];
        for(let i=0; i<this.state.comments; i++){
            allComments.push(
                <CommentContainer 
                    key={`comment-${comments[i].id}`} 
                    comment={comments[i]}
                    subComments={comments[i].subComments}
                    />
            )    
        }
        return allComments;
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
                    <div className="post-interactions">
                        <div className="total-likes"></div>
                        <div className="total-comments">{this.props.post.totalComments ? 
                                `${this.props.post.totalComments} ${this.props.post.totalComments > 1 ? "Comments" : "Comment"}` : null}</div>
                    </div>
                    <div className="separator" />
                        <div className="likes-comments">
                            <div className="likes"> Like </div>
                            <div className="comments"> Comment </div>
                        </div>
                    <div className="separator" />
                    <div className="comments">
                        {
                            this.renderComments()
                        }
                    </div>
            </div>
        )
            
    }
}