import React from "react";
import SignUpModal from "../modal/sign_up_modal";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModalEvent = this.openModalEvent.bind(this);
    }
    update(field){
        return e => {
            e.preventDefault();
            this.setState({
                [field]: e.currentTarget.value
            })
        }  
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state)
    }
    openModalEvent(e){
        e.preventDefault();
        this.props.openModal("signup");
    }
    render(){
        return (
            <div className="login-container">
                <SignUpModal 
                    modal={this.props.modal} 
                    closeModal={this.props.closeModal}
                    signup = {this.props.signup}
                />
                <div className="login-form-container">
                        
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            {this.props.location.pathname === "/login" ? <div className="login-header"> Log Into Friendlybook </div> : null}
                            <input onChange={this.update("email")} type="text" value={this.state.email} placeholder="Email" />
                            <input onChange={this.update("password")} type="password" value={this.state.password} placeholder="Password" />
                            <button className="login-button"> Log In </button>
                            {/* <a href="#"> Forgot Password? </a> */}
                            <div className="separator" />
                            <a onClick={this.openModalEvent} >Create New Account</a>
                        </form>
                </div>
            </div>  
        )
    }
}