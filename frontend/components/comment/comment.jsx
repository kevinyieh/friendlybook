import React from "react"
import { commentTimeRender } from "../../util/time_util"
import { Link } from 'react-router-dom';
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        const commenter = this.props.users[this.props.comment.userId]
        const fullName = commenter ? `${commenter.firstName} ${commenter.lastName}` : ""
        this.state = {
            fullName,
            subCommentInc: 7,
            showReply: false,
            showReplyInput: false,
            dropdownOptions: false
        }
        this.ownPost = this.props.posts[this.props.comment.postId].userId === this.props.currentUser.id;
        this.ownComment = this.props.comment.userId === this.props.currentUser.id;
        this.handleLike = this.handleLike.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
    }

    componentDidMount(){
        document.addEventListener("mousedown",this.handleClickOutside);
    }
    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleClickOutside);
    }
    handleClickOutside(e){
        if(this.dropdown && !this.dropdown.contains(e.target)){
            this.setState({
                dropdownOptions: false
            })
        }
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
    handleLike(e){
        e.preventDefault();
    }
    handleReply(e){
        e.preventDefault();
    }

    handleDropDown(e){
        e.preventDefault();
        this.setState({
            dropdownOptions: !this.state.dropdownOptions
        })
    }

    handleEditComment(e){

    }
    handleDeleteComment(e){
        e.preventDefault();
        this.setState({
            dropdownOptions: false
        })
        this.props.deleteComment(this.props.comment.id);
    }

    renderSubComments(subComments){
        if(!subComments) return null;
        let listState = this.state.showReply ? "" : "hidden";
        let rotateArrow = this.state.showReply ? "" : "fa-rotate-180";
        let showReplyInput = this.state.showReplyInput ? "" : "hidden";
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
                                    currentUser={this.props.currentUser}
                                    posts={this.props.posts}
                                />
                            )
                        })
                    }
                    <input className={`showReplyInput`} />
                </ul>
            </div>

        )
    }

    renderDropDownContainer(){
        if(this.ownPost || this.ownComment){
            return (
                <div className="comment-dropdown-container" ref={node => this.dropdown = node}>
                    <div onClick={this.handleDropDown} className="meatball">
                            <i className="fas fa-ellipsis-h" />
                    </div>
                    { this.renderDropDown() }
                </div>
            )
        }
    }

    renderDropDown(){
        if( this.ownComment ){
            return (
                <div className={`${this.state.dropdownOptions ? "" : "hidden"} `}>
                    <div className="comment-options">
                        <ul className={`${this.state.dropdownOptions ? "" : "hidden" }`}>
                            <li onClick={this.handleEditComment} className="edit-comment">
                                <p> Edit </p>
                            </li>
                            <li onClick={this.handleDeleteComment} className="delete-comment">
                                <p> Delete </p>
                            </li>
                        </ul>
                        <div className="arrow-up comment-dropdown-carrot" />
                    </div>
                </div>
            )
        }
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
                        <div className="comment-main">
                            <div className="comment-content-container">
                                <Link to={`/users/${this.props.comment.userId}`}> <strong> {this.state.fullName} </strong> </Link>
                                <div className="comment-content"> {this.props.comment.comment} </div>
                            </div>
                            {
                                this.renderDropDownContainer()
                            }
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