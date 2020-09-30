import React from "react";
import { timeRender } from "../../util/time_util";
import { Link } from "react-router-dom";
import CommentSection from "../comment/comment_section";


export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        const rootComments = this.props.post.comments ? Object.values(this.props.post.comments).filter( comment => !comment.source) : [];
        const showComments = this.props.post.comments ? Math.min(rootComments.length, 2) : 0;
        this.state = {
            showComments,
            dropdownOptions: false,
            comment: "",
            rootComments,
            showInc: Math.min(10,rootComments.length - showComments)
        }
        
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
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
            const rootComments = this.props.post.comments ? Object.values(this.props.post.comments).filter( comment => !comment.source) : [];
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
        this.commentInput.focus();
    }
    renderPostPhoto(){
        if(!this.props.post.photo) return null;
        return (
            <img className="post-photo" src={this.props.post.photo}/>
        )
    }
    render(){
        const ownPost = this.props.currentUser.id === this.props.post.userId;
        const allComments = this.state.rootComments ? this.state.rootComments : null;
        const sortedComments = allComments ? allComments.sort((comment1,comment2) => comment1.createdAt > comment2.createdAt ? 1 : -1) : null;
        const commentsToRender = sortedComments ? sortedComments.slice(allComments.length-this.state.showComments,allComments.length) : null;
        const allCommentsShown = !this.props.post.comments || (this.state.rootComments.length === this.state.showComments);
        const posterPfp = this.props.poster.pfp ? this.props.poster.pfp : window.defaultPfp;
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
        return(
            <div className="post-container">
                    <div className="post-header">
                        <div className="profile-pic-icon">
                            <img src={posterPfp} />
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
                        <div className="total-likes"></div>
                        <div className="total-comments">{this.props.post.totalComments ? 
                                `${this.props.post.totalComments} ${this.props.post.totalComments > 1 ? "Comments" : "Comment"}` : null}</div>
                    </div>
                    <div className="separator" />
                        <div className="like-comment">
                            <div className="like"> 
                                <div className="like-icon">
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
                    <div onClick={this.handleShowMore} className={allCommentsShown ? "hidden" : "show-comments"}> <p> {`Show ${this.state.showInc} more comments`} </p></div>
                    {<CommentSection  
                        comments={commentsToRender}
                    />}
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
            </div>
        )
    }
}