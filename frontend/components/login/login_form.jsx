import React from "react";
import SignUpModal from "../modal/sign_up_modal";
import { errorAndBlank } from "../../util/error_util";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModalEvent = this.openModalEvent.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
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
    demoLogin(e){
        e.preventDefault();
        this.props.login({
            email: "demo@demo.com",
            password: "password"
        })
    }
    render(){
        const emailError = errorAndBlank(this.props.errors.login.email,this.state.email);
        const passwordError = errorAndBlank(this.props.errors.login.password,this.state.password);
        return (
            <div className="login-container">
                <SignUpModal 
                    modal={this.props.modal} 
                    closeModal={this.props.closeModal}
                    signup = {this.props.signup}
                    errors = {this.props.errors.signup}
                />
                <div className="login-form-container">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            {this.props.location.pathname === "/login" ? <div className="login-header"> Log Into Friendlybook </div> : null}
                            <div className="input-container">
                                <input onChange={this.update("email")} 
                                    type="text" 
                                    value={this.state.email} 
                                    placeholder="Email" 
                                    className={ emailError ? "input-error" : "input-pending"}/>
                                <i className={`${emailError ? "fas fa-times-circle error-icon" : "hidden"}`} />
                            </div>
                            {emailError ? <p className="error-message"> {this.props.errors.login.email} </p> : "" }

                            <div className="input-container">
                                <input onChange={this.update("password")} 
                                    type="password" 
                                    value={this.state.password} 
                                    placeholder="Password" 
                                    className={passwordError ? "input-error" : "input-pending"}/>
                                <i className={`${passwordError ? "fas fa-times-circle error-icon" : "hidden"}`} />
                            </div>
                                
                            {passwordError ? <p className="error-message"> {this.props.errors.login.password} </p> : "" }

                            <button className="login-button"> Log In </button>
                            {/* <a href="#"> Forgot Password? </a> */}
                            <div className="separator" />
                            <a onClick={this.openModalEvent} >Create New Account</a>
                            <div className="separator" />
                            <a onClick={this.demoLogin} >Demo Login</a>
                        </form>
                </div>
            </div>  
        )
    }
}