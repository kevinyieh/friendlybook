import React from "react"
import { commentTimeRender } from "../../util/time_util"
import { Link } from 'react-router-dom';
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        const commenter = this.props.users[this.props.comment.userId];
        const fullName = commenter ? `${commenter.firstName} ${commenter.lastName}` : "";
        let isLiked = false;
        if(this.props.comment.likes){
            isLiked = Object.values(this.props.comment.likes).map( like => like.userId).includes(this.props.currentUser.id)
        } 
        this.state = {
            fullName,
            subCommentInc: 7,
            showReply: false,
            showReplyInput: false,
            dropdownOptions: false,
            comment: "",
            commenter,
            isLiked
        }
        this.ownPost = this.props.posts[this.props.comment.postId].userId === this.props.currentUser.id;
        this.ownComment = this.props.comment.userId === this.props.currentUser.id;
        this.handleLike = this.handleLike.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
        this.handleCreateReply = this.handleCreateReply.bind(this);
        this.activateReplyInput = this.activateReplyInput.bind(this);
        this.replyTracker = this.replyTracker.bind(this);
        this.handleToggleLike = this.handleToggleLike.bind(this);
    }
    replyTracker(reply){
        if (reply) this.reply = reply;
    }
    componentDidMount(){
        document.addEventListener("mousedown",this.handleClickOutside);
    }
    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleClickOutside);
    }
    handleClickOutside(e){
        if(this.dropdown && !this.dropdown.contains(e.target)
            && this.meatball && !this.meatball.contains(e.target)
        ){
            this.setState({
                dropdownOptions: false
            })
        }
    }
    componentDidUpdate(prevProps, prevState){
        const commenter = this.props.users[this.props.comment.userId]
        // const parentComment = this.props.comment.parentCommentId
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

    activateReplyInput(e){
        e.preventDefault();
        const commentInput = this.props.commentInput ? this.props.commentInput : this.commentInput;
        if (this.props.replyTracker){
            this.props.replyTracker(this.props.comment.id);
        } 
        this.setState({
            showReply: true,
        },() => commentInput.focus())
    }

    handleLike(e){
        e.preventDefault();
    }

    handleDropDown(e){
        // e.preventDefault();
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

    update(field){
        return e => {
            return this.setState({
                [field]: e.target.value
            })
        }
    }

    handleCreateReply(e){
        e.preventDefault();
        const parentCommentId = this.reply ? this.reply : this.props.comment.id
        this.props.createComment({
            comment: this.state.comment,
            post_id: this.props.comment.postId,
            source: this.props.comment.id,
            parent_comment_id: parentCommentId
        })
        this.setState({
            comment: "",
            reply: null
        })
    }

    subCommentsRenderHelper(subComments){
        if (!subComments) return null;
        const source = this.props.comment.source ? this.props.comment.source : this.props.comment.id;
        return (
            Object.values(subComments).map( subComment => {
                const likes = subComment.likes ? Object.values(subComment.likes).length : 0;
                return (
                    <Comment 
                        key={`comment-${subComment.id}`} 
                        comment={subComment}
                        users={this.props.users}
                        currentUser={this.props.currentUser}
                        posts={this.props.posts}
                        deleteComment={this.props.deleteComment}
                        commentInput={this.commentInput}
                        source={source}
                        replyTracker={this.replyTracker}
                        commenter={this.state.commenter}
                        likeComment={this.props.likeComment}
                        unlikeComment={this.props.unlikeComment}
                        likes={likes}
                    />
                )
            })
        )
    }
    showReplyHelper(subsExists){
        if(!subsExists) return null;
        let rotateArrow = this.state.showReply ? "" : "fa-rotate-180";
        return (
            <div className={`show-reply`} onClick={this.toggleReplyState()}>
                <i className={`fas fa-reply ${rotateArrow}`} />
                &nbsp;
                <p> { this.state.showReply ? "Hide replies" : "Show replies"} </p>
            </div>
        )
    }
    renderSubComments(subComments,commenter){
        let listState = this.state.showReply ? "" : "hidden";
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
        if (this.props.source) return null;
        return(
            <div>
                {
                    this.showReplyHelper(!!subComments)
                }
                <ul className={`sub-comments-container ${listState}`}>
                    {
                        this.subCommentsRenderHelper(subComments)
                    }
                    <div className="comment-input-container">
                        <div className="profile-pic-icon">
                            <img src={pfp} />
                        </div>
                        <form onSubmit={this.handleCreateReply}>
                            <input 
                                ref= { node => this.commentInput = node}
                                onChange={this.update("comment")}
                                value={this.state.comment}
                                className="comment-input" 
                                placeholder="Write a reply..."
                                />
                        </form>
                    </div>
                </ul>
            </div>

        )
    }

    renderDropDownContainer(){
        if(this.ownPost || this.ownComment){
            return (
                <div className="comment-dropdown-container" ref={node => this.dropdown = node}>
                    { this.renderDropDown() }
                </div>
            )
        }
    }

    renderDropDown(){
        if( this.ownComment ){
            return (
                    <div className={`${this.state.dropdownOptions ? "comment-options" : "hidden"} `}>
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
            )
        }
        else if( this.ownPost ){
            return (
                    <div className={`${this.state.dropdownOptions ? "comment-options non-commenter" : "hidden"} `}>
                        <ul className={`${this.state.dropdownOptions ? "" : "hidden" }`}>
                            <li onClick={this.handleDeleteComment} className="delete-comment">
                                <p> Delete </p>
                            </li>
                        </ul>
                        <div className="arrow-up comment-dropdown-carrot" />
                    </div>
            )
        }
    }

    renderLikes(likes){
        if (!likes) return null;
        return (
            <div className="comment-like-icon">
                <i className="far fa-thumbs-up" />
                &nbsp;
                <p> {likes} </p>
            </div>
        )
    }

    handleToggleLike(e){
        e.preventDefault();
        if(this.state.isLiked){
            this.setState({ 
                isLiked: false
            },() => this.props.unlikeComment(this.props.comment.id))
        }else{
            this.setState({ 
                isLiked: true,
            },() => this.props.likeComment(this.props.comment.id))
        }
    }

    render(){
        if (!this.state.fullName) return null;
        const commenter = this.props.users[this.props.comment.userId]
        const pfp = commenter.pfp ? commenter.pfp : window.defaultPfp;
        
        return(
            <div className="comment-chain">
                <div className="comment-container">
                    <div className="profile-pic-icon">
                        <img src={pfp} />
                    </div>
                    <div className="comment-details">
                        <div className="comment-main">
                            <div className="comment-content-container">
                                <Link to={`/users/${this.props.comment.userId}`}> <strong> {this.state.fullName} </strong> </Link>
                                <div className="comment-content"> {this.props.comment.comment} </div>
                                { this.renderLikes(this.props.likes)}
                            </div>
                            <div onClick={this.handleDropDown} className="meatball" ref={ node => this.meatball = node}>
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            {
                                this.renderDropDownContainer()
                            }
                        </div>
                            
                        <div className="comment-like-reply">
                            <div 
                                onClick={this.handleToggleLike}
                                className={`comment-like ${this.state.isLiked ? "comment-is-liked" : "comment-not-liked"}`}>
                                <p>Like</p>
                            </div>
                            &nbsp;
                            <div 
                                onClick={this.activateReplyInput}
                                className="comment-reply">
                                <p>Reply</p>
                                
                            </div>
                            &nbsp;
                            <div>
                                {commentTimeRender(this.props.comment.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderSubComments(this.props.subComments,commenter)}
            </div>
                
        )
            
    }
}