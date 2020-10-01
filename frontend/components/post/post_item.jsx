import React from "react";
import { timeRender } from "../../util/time_util";
import { Link } from "react-router-dom";
import CommentSection from "../comment/comment_section";


export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        // const rootComments = this.props.post.comments ? Object.values(this.props.post.comments).filter( comment => !comment.source) : [];
        const rootComments = this.props.post.comments ? Object.values(this.props.post.comments) : [];
        const showComments = this.props.post.comments ? Math.min(rootComments.length, 2) : 0;
        this.state = {
            showComments,
            rootComments,
            dropdownOptions: false,
            comment: "",
            showInc: Math.min(10,rootComments.length - showComments),
            commentsVisibile: true,
            isLiked: this.props.isLiked,
            justLiked: false
        }
        
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.toggleCommentSection = this.toggleCommentSection.bind(this);
        this.handleToggleLike = this.handleToggleLike.bind(this);
    }

    handleClickOutside(e){
        if(this.dropdownOptions && !this.dropdownOptions.contains(e.target)){
            this.setState({
                dropdownOptions: false
            })
        }
    }
    componentDidMount(){
        document.addEventListener("mousedown",this.handleClickOutside)
    }
    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleClickOutside)
    }
    componentDidUpdate(prevProp,prevState){
        if(prevProp.post.totalComments !== this.props.post.totalComments){
            const rootComments = this.props.post.comments ? Object.values(this.props.post.comments) : [];
            const showComments = this.state.showComments + (rootComments.length - prevState.rootComments.length);
            const showInc = Math.min(10,rootComments.length - showComments);
            this.setState({
                rootComments,
                showComments,
                showInc
            })
        }else if(prevState.showComments !== this.state.showComments){
            this.setState({
                showInc: Math.min(10,this.state.rootComments.length - this.state.showComments)
            })
        }
    }

    handleShowMore(e){
        e.preventDefault();
        this.setState({
            showComments: this.state.showComments + this.state.showInc
        })
    }

    handleEditPost(e){
        e.preventDefault;
        this.setState({
            dropdownOptions: false
        })
        this.props.openModal({type:"edit-post",postId:this.props.post.id});
    }
    handleDropDown(e){
        e.preventDefault();
        this.setState({
            dropdownOptions: !this.state.dropdownOptions
        })
    }
    handleDeletePost(e){
        e.preventDefault;
        this.setState({
            dropdownOptions: false
        })
        this.props.deletePost(this.props.post.id);
    }
    update(field){
        return e => {
            e.preventDefault();
            this.setState({
                [field]: e.target.value
            })
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.createComment({
            post_id: this.props.post.id,
            comment: this.state.comment,
        }).then(() => {
            this.setState({
                comment: ""
            })
        })
        
    }
    handleCommentClick(e){
        e.preventDefault();
        if(!this.state.commentsVisibile){
            this.setState({
                commentsVisibile: true
            }, () => this.commentInput.focus())
        }else {
            this.commentInput.focus();
        }
    }
    renderPostPhoto(){
        if(!this.props.post.photo) return null;
        return (
            <img className="post-photo" src={this.props.post.photo}/>
        )
    }

    toggleCommentSection(e){
        e.preventDefault();
        this.setState({
            commentsVisibile: !this.state.commentsVisibile
        })
    }
    renderCommentInput(pfp){
        return (
            <div className="comment-input-container">
                <div className="profile-pic-icon">
                    <img src={pfp} />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        ref= { node => this.commentInput = node}
                        onChange={this.update("comment")}
                        value={this.state.comment}
                        className="comment-input" 
                        placeholder="Write a comment..."/>
                </form>
            </div>
        )
    }
    renderShowMore(allCommentsShown){
        return (
            <div onClick={this.handleShowMore} 
                className={allCommentsShown ? "hidden" : "show-comments"}> 
                    <p> 
                        {`Show ${this.state.showInc} more comments`} 
                    </p>
            </div>
        )
    }

    handleToggleLike(e){
        e.preventDefault();
        if(this.state.isLiked){
            this.setState({ 
                isLiked: false ,
                justLiked: false
            },() => this.props.unlikePost(this.props.post.id))
        }else{
            this.setState({ 
                isLiked: true,
                justLiked: true
            },() => this.props.likePost(this.props.post.id))
        }
    }

    render(){
        const rootComments = this.props.post.comments ? Object.values(this.props.post.comments) : [];
        const ownPost = this.props.currentUser.id === this.props.post.userId;
        const allComments = rootComments ? rootComments : null;
        const sortedComments = allComments ? allComments.sort((comment1,comment2) => comment1.createdAt > comment2.createdAt ? 1 : -1) : null;
        const commentsToRender = sortedComments ? sortedComments.slice(allComments.length-this.state.showComments,allComments.length) : null;
        const allCommentsShown = !this.props.post.comments || (rootComments.length === this.state.showComments);
        const posterPfp = this.props.poster.pfp ? this.props.poster.pfp : window.defaultPfp;
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
        const likes = this.props.post.likes ? Object.values(this.props.post.likes) : null;
        return(
            <div className="post-container">
                    <div className="post-header">
                        <Link to={`/users/${this.props.poster.id}`}>
                            <div className="profile-pic-icon">
                                <img src={posterPfp} />
                            </div>
                        </Link>
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
                        <div ref ={node => this.dropdownOptions = node} 
                            className={`${ownPost ? "post-options-container" : "hidden"}`}>
                            <div onClick={this.handleDropDown} className="meatball">
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            <div className={`${this.state.dropdownOptions ? "" : "hidden"} `}>
                                <div className="post-options">
                                    <ul className={`${this.state.dropdownOptions ? "" : "hidden" }`}>
                                        <li onClick={this.handleEditPost} className="edit-post">
                                            <div className="edit-icon-container">
                                                <i className="fas fa-pencil-alt" />
                                            </div>
                                            &nbsp;
                                            <p> Edit post </p>
                                        </li>
                                        <li onClick={this.handleDeletePost} className="delete-post">
                                            <div className="delete-icon-container">
                                                <i className="far fa-trash-alt" />
                                            </div>
                                            &nbsp;
                                            <p> Delete post </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        {this.props.post.post}
                        {this.renderPostPhoto()}
                    </div>
                    <div className="post-interactions">
                        <div className="total-likes">
                                {likes ? 
                                `${likes.length} ${likes.length > 1 ? "Likes" : "Like"}` : null}
                        </div>
                        <div onClick={this.toggleCommentSection} className="total-comments">{this.props.post.totalComments ? 
                                `${this.props.post.totalComments} ${this.props.post.totalComments > 1 ? "Comments" : "Comment"}` : null}
                        </div>
                    </div>
                    <div className="separator" />
                        <div className="like-comment">
                            <div onClick={this.handleToggleLike} className={`like ${this.state.isLiked ? "liked" : "not-liked"}`}> 
                                <div className={`like-icon ${this.state.justLiked ? "just-liked" : ""}`}>
                                    <i className="far fa-thumbs-up" />
                                </div>
                                &nbsp;
                                <p unselectable> Like </p>
                            </div>
                            <div onClick={this.handleCommentClick} className="comment"> 
                                <div className="like-icon">
                                    <i className="far fa-comment-alt" />
                                </div>
                                &nbsp;
                                <p unselectable> Comment </p>
                            </div>
                        </div>
                    <div className="separator" />
                    {this.state.commentsVisibile ? this.renderShowMore(allCommentsShown) : null}
                    {this.state.commentsVisibile ? <CommentSection comments={commentsToRender}/> : null}
                    {this.state.commentsVisibile ? this.renderCommentInput(pfp) : null}
            </div>
        )
    }
}