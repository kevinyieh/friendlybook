import React from "react"
import { commentTimeRender } from "../../util/time_util"
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            subCommentInc: 7
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleReply = this.handleReply.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        const commenter = this.props.users[this.props.comment.userId]
        const parentComment = this.props.comment.parentCommentId
        if (!prevState.fullName){
            if (commenter){
                this.setState({
                    fullName: `${commenter.firstName} ${commenter.lastName}`
                })
            }
        }
    }
    renderSubComments(subComments){
        if(!subComments) return null;
        return(
            <ul className="sub-comments-container">
                {subComments.map( subComment => {
                    return <Comment />
                })}
            </ul>
        )
    }

    handleLike(e){
        e.preventDefault();
    }
    handleReply(e){
        e.preventDefault();
    }
    render(){
        if (!this.state.fullName) return null;
        return(
            <div className="comment-container">
                <div className="profile-pic-icon">
                    <i className="fas fa-user" />
                </div>
                <div className="comment-details">
                    <div className="comment-content-container">
                        <div className="commenter"> <strong> {this.state.fullName} </strong> </div>
                        <div className="comment-content"> {this.props.comment.comment} </div>
                    </div>
                    <div className="comment-like-reply">
                        <div className="comment-like">
                            Like
                        </div>
                        &nbsp;
                        <div className="comment-reply">
                            Reply
                        </div>
                        &nbsp;
                        <div>
                            {commentTimeRender(this.props.comment.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        )
            
    }
}