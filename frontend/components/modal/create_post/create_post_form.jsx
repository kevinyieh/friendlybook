import React from "react";

export default class CreatePostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: "",
            wallId: this.props.wallId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.post) return;
        const postParams = {
            post: this.state.post,
            wall_id: this.state.wallId
        }
        this.props.closeModal();
        this.props.createPost(postParams);
    }

    handleCloseModal(e){
        e.preventDefault();
        this.props.closeModal();
    }

    render(){
        if (this.props.modal !== "create-post") return null

        const fieldEmpty = !this.state.post;
        return (
            <div className="modal-backdrop">
                <div className="create-post-container">
                    <div onClick={this.handleCloseModal} className="close-button">
                        <i className="fas fa-times" />
                    </div>
                        
                    <div className="create-post-header">
                        <h2> Create Post </h2>
                        <div className="separator" />
                        <div className="create-post-user">
                            <div className="profile-pic-icon">
                                <i className="fas fa-user" />
                            </div>
                            <p>{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</p>
                        </div>
                    </div>
                    <textarea onChange={this.update("post")} placeholder={`What's on your mind, ${this.props.currentUser.firstName}?`} />
                    <button className={fieldEmpty ? "not-ready" : "ready"} onClick={this.handleSubmit}> 
                        <p>Post</p>
                    </button>
                </div>
            </div>
        )
    }
}