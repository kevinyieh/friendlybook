import React from "react";

export default class CreatePostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: "",
            wallId: this.props.wallId,
            postId: this.props.postId,
            photo: null
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pushFile = this.pushFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
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
                postId: this.props.postId,
                photo: this.props.posts[this.props.postId].photo
            })
        }else{
            this.setState({
                post: "",
                postId: null
            })
        }
    }

    handleSubmit(action){
        const wallId = this.props.match.userId ? this.props.match.userId : this.state.wallId;
        return e => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("post[post]",this.state.post);
            formData.append("post[wall_id]",this.props.wallId);
            formData.append("post[id]",this.state.postId);
            if(this.state.photo) formData.append("post[photo]",this.state.photo);
            this.props.closeModal();
            this.setState({
                post: "",
                photo: null
            })
            action(formData);
        }
    }

    handleCloseModal(e){
        e.preventDefault();
        this.props.closeModal();
    }

    pushFile(e){
        e.preventDefault();
        this.setState({
            photo: e.target.files[0]
        })
    }
    removePhoto(e){
        e.preventDefault();
        this.setState({
            photo:null
        })
    }
    renderPhoto(){
        if(!this.state.photo) return null;
        let fileUrl = null;
        try {
            fileUrl = URL.createObjectURL(this.state.photo);
        }catch(e1) {
            fileUrl = this.state.photo
        }
        return (
            <div className="image-preview" >
                <img src={fileUrl} />
                <div onClick={this.removePhoto} className="close-photo"> <i className="fas fa-times" /> </div>
            </div>
        )
    }
    render(){
        if (!(this.props.modal === "create-post" || this.props.modal === "edit-post" )) return null;
        const postTitle = this.props.modal === "create-post" ? "Create Post" : "Edit Post";
        const postButton = this.props.modal === "create-post" ? "Post" : "Edit";
        const action = this.props.modal === "create-post" ? this.props.createPost : this.props.editPost;
        const fieldEmpty = !this.state.post;
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
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
                                <img src={pfp} />
                            </div>
                            <p>{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</p>
                        </div>
                    </div>
                    <textarea 
                        ref={node => this.inputBox = node}
                        value={this.state.post} 
                        onChange={this.update("post")} 
                        placeholder={`What's on your mind, ${this.props.currentUser.firstName}?`} />
                    {this.renderPhoto()}
                    <label className="file-upload-input">
                        <input onChange={this.pushFile} type="file" />
                        <i className="fas fa-images" />
                    </label>
                        
                    <button className={fieldEmpty ? "not-ready" : "ready"} onClick={this.handleSubmit(action)}> 
                        <p>{postButton}</p>
                    </button>
                </div>
            </div>
        )
    }
}