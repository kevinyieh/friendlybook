import React from "react"
import { commentTimeRender } from "../../util/time_util"
import { Link } from 'react-router-dom';
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            subCommentInc: 7,
            showReply: false
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

    toggleReplyState(){
        return e => {
            e.preventDefault();
            this.setState({
                showReply: !this.state.showReply
            })
        }
    }
    renderSubComments(subComments){
        if(!subComments) return null;
        let listState = this.state.showReply ? "" : "hidden";
        let rotateArrow = this.state.showReply ? "" : "fa-rotate-180";
        return(
            <div>
                <div className={`show-reply`} onClick={this.toggleReplyState()}>
                    <i className={`fas fa-reply ${rotateArrow}`} />
                    &nbsp;
                    <p> { this.state.showReply ? "Hide replies" : "Show replies"} </p>
                </div>
                <ul className={`sub-comments-container ${listState}`}>
                    {
                        Object.values(subComments).map( subComment => {
                            return (
                                <Comment 
                                    key={`comment-${subComment.id}`} 
                                    comment={subComment}
                                    users={this.props.users}
                                />
                            )
                        })
                    }
                </ul>

            </div>

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
            <div className="comment-chain">
                <div className="comment-container">
                    <div className="profile-pic-icon">
                        <i className="fas fa-user" />
                    </div>
                    <div className="comment-details">
                        <div className="comment-content-container">
                            <Link to={`/users/${this.props.comment.userId}`}> <strong> {this.state.fullName} </strong> </Link>

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
                {this.renderSubComments(this.props.subComments)}
            </div>
                
        )
            
    }
}

        // poster={
        //     id: post.userId,
        //     fullName: `${this.props.users[post.userId].firstName} ${this.props.users[post.userId].lastName}`
        // }
        // postee={
        //     id: post.wallId,
        //     fullName: `${this.props.users[post.wallId].firstName} ${this.props.users[post.wallId].lastName}`
        // }