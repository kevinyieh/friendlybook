import React from "react";

export default class CreatePostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: "",
            wallId: this.props.wallId,
            postId: this.props.postId
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    update(field){
        return e => {
            e.preventDefault();
            this.setState({
                [field]: e.target.value
            })
        }
    }
    componentDidUpdate(prevProp){
        if (this.inputBox) this.inputBox.focus();
        if (!prevProp.postId && !this.props.postId) return null;
        if (prevProp.postId === this.props.postId) return null;
        if(this.props.postId){
            this.setState({
                post: this.props.posts[this.props.postId].post,
                postId: this.props.postId
            })
        }else{
            this.setState({
                post: "",
                postId: null
            })
        }
    }
    handleSubmit(action){
        return e => {
            e.preventDefault();
            if(!this.state.post) return;
            const postParams = {
                post: this.state.post,
                wall_id: this.state.wallId,
                id: this.state.postId
            }
            this.props.closeModal();
            action(postParams);
        }
    }

    handleCloseModal(e){
        e.preventDefault();
        this.props.closeModal();
    }

    render(){
        if (!(this.props.modal === "create-post" || this.props.modal === "edit-post" )) return null;
        const postTitle = this.props.modal === "create-post" ? "Create Post" : "Edit Post";
        const postButton = this.props.modal === "create-post" ? "Post" : "Edit";
        const action = this.props.modal === "create-post" ? this.props.createPost : this.props.editPost;
        const fieldEmpty = !this.state.post;
        
        return (
            <div className="modal-backdrop">
                <div className="create-post-container">
                    <div onClick={this.handleCloseModal} className="close-button">
                        <i className="fas fa-times" />
                    </div>
                        
                    <div className="create-post-header">
                        <h2> {postTitle} </h2>
                        <div className="separator" />
                        <div className="create-post-user">
                            <div className="profile-pic-icon">
                                <img src={this.props.currentUser.pfp} />
                            </div>
                            <p>{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</p>
                        </div>
                    </div>
                    <textarea 
                        ref={node => this.inputBox = node}
                        value={this.state.post} 
                        onChange={this.update("post")} 
                        placeholder={`What's on your mind, ${this.props.currentUser.firstName}?`} />
                    <button className={fieldEmpty ? "not-ready" : "ready"} onClick={this.handleSubmit(action)}> 
                        <p>{postButton}</p>
                    </button>
                </div>
            </div>
        )
    }
}