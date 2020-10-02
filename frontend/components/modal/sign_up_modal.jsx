import React from "react";
const months = {Jan:31,Feb:28, Mar:31, Apr:30, May:31, Jun:30, Jul:31, Aug:31, Sep:30, Oct:31, Nov:30, Dec:31}
const pronouns = {"she/her": 'She: "Wish her a happy birthday!"',"he/him": 'He: "Wish him a happy birthday"', "they/them": 'They: "Wish them a happy birthday!"'}
const defaultPronouns = {
    male: "he/him",
    female: "she/her"
}
import { errorAndBlank } from "../../util/error_util";

export default class SignUpModal extends React.Component{
    constructor(props){
        super(props);
        const currDate = new Date();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            month: Object.keys(months)[currDate.getMonth()],
            day: currDate.getDate(),
            year: currDate.getFullYear(),
            gender: null,
            pronoun: ""
        }
        this.closeModalEvent = this.closeModalEvent.bind(this);
        this.customGender = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    closeModalEvent(e){
        e.preventDefault();
        this.props.closeModal();
    }

    update(field){
        return (e) =>{
            
            this.setState({
                [field]: e.target.value
            })
        }
    }

    cleanedParams(){
        let {firstName, lastName, email, password, month, day, year, gender, pronoun} = this.state;
        gender = gender ? gender : gender === null ? null : "non-binary";
        if(gender !== "non-binary") pronoun = pronoun ? pronoun : defaultPronouns[gender]
        return {firstName, lastName, email, password, month, day, year, gender, pronoun};
    }

    handleSubmit(e){
        e.preventDefault();
        
        this.props.signup(this.cleanedParams()).then(this.props.closeModal);
    }

    handleRadio(field){
        return e => {
            this.customGender = e.target.value === "non-binary" ? true : false;
            this.update(field)(e);
            if(e.target.value !== "non-binary"){
                this.update("pronoun")({target: defaultPronouns[e.target.value]})
            }
        }
    }

    render(){
        const firstNameError = errorAndBlank(this.props.errors.firstName,this.state.firstName);
        const lastNameError = errorAndBlank(this.props.errors.lastName,this.state.lastName);
        const emailError = this.props.errors.email ? this.props.errors.email[0] ==="has already been taken" ? true : errorAndBlank(this.props.errors.email,this.state.email) : false;
        const passwordError = this.props.errors.password ? this.state.password.length < 7 : errorAndBlank(this.props.errors.password,this.state.password);
        const genderError = errorAndBlank(this.props.errors.gender,this.state.gender);
        const pronounError = errorAndBlank(this.props.errors.pronoun,this.state.pronoun);

        if(!(this.props.modal === "signup")) return null;
        return(
            <div className="modal">
                <div className="modal-backdrop">
                    <div className="signup-form-container">
                        <form className="signup-form" onSubmit={this.handleSubmit}>
                            <div className="signup-header">
                                <div className="signup-header-text">
                                    <h1>Sign Up</h1>
                                    <p>It's quick and easy.</p>
                                </div>
                                <div className="close-icon" onClick={this.closeModalEvent}> 
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                            <div className="separator" />
                            <div className="basic-info">
                                <div className="name-input-container">
                                    <div className="signup-input">
                                        <input onChange={this.update("firstName")} 
                                            className={`${firstNameError ? "input-error" : "input-pending"}`}
                                            type="text" 
                                            value={this.state.firstName} 
                                            placeholder="First name" />
                                        {firstNameError ? <p className="error-message"> {this.props.errors.firstName} </p> : null }
                                    </div>
                                        
                                    <div className="signup-input">
                                        <input onChange={this.update("lastName")} 
                                            className={`${lastNameError ? "input-error" : "input-pending"}`}
                                            type="text" 
                                            value={this.state.lastName} 
                                            placeholder="Last name" />
                                        {lastNameError ? <p className="error-message"> {this.props.errors.lastName} </p> : null }
                                    </div>
                                        
                                </div>
                                <div className="user-input">
                                    <div className="signup-input">
                                        <input onChange={this.update("email")} 
                                            className={`signup-email ${emailError ? "input-error" : "input-pending"}`}
                                            type="text" 
                                            value={this.state.email} 
                                            placeholder="Email" />
                                        {emailError ? <p className="error-message"> {this.props.errors.email} </p> : null }
                                    </div>
                                </div>
                                <div className="user-input">
                                    <div className="signup-input">
                                        <input onChange={this.update("password")} 
                                            className={`signup-password ${passwordError ? "input-error" : "input-pending"}`}
                                            type="password" 
                                            value={this.state.password} 
                                            placeholder="New password" />
                                        {passwordError ? <p className="error-message"> {this.props.errors.password} </p> : null }
                                    </div>
                                </div>
                            </div>
                            <div className="basic-bio">
                                <div className="birthdate-form">
                                    <div className="small-label"> Birthday </div>
                                    <div className="birthdate-selector">
                                        <select onChange={this.update("month")} className="month-selector" value={this.state.month}>
                                            {Object.keys(months).map( (month) => <option key={month} value={month}> {month} </option>)}
                                        </select>
                                        <select onChange={this.update("day")} className="day-selector" value={this.state.day}>
                                            {Array(months[this.state.month]).fill(null).map( (_,i) => <option key={i+1} value={i+1}> {i+1} </option>)}
                                        </select>
                                        <select onChange={this.update("year")} className="year-selector" value={this.state.day}>
                                            {Array(116).fill(null).map( (_,i) => <option key={this.state.year - i} value={this.state.year - i}> {this.state.year - i} </option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="gender-container">
                                    <div className="small-label"> Gender </div>
                                    <div className="gender-radio" onChange={this.handleRadio("gender")}>
                                        <div className={`radio-container ${genderError ? "input-error" : "input-pending"}`}>
                                            <label className="gender-label" htmlFor="female-radio">Female</label>
                                            <input  id="female-radio" 
                                                type="radio" name="female" value="female" 
                                                checked={this.state.gender === "female"}/>
                                        </div>
                                        <div className={`radio-container ${genderError ? "input-error" : "input-pending"}`}>
                                            <label className="gender-label" htmlFor="male-radio">Male</label>
                                            <input id="male-radio" 
                                                type="radio" name="male" value="male" 
                                                checked={this.state.gender === "male"}/>
                                        </div>
                                        <div className={`radio-container ${genderError ? "input-error" : "input-pending"}`}>
                                            <label className="gender-label" htmlFor="custom-radio">Custom</label>
                                            <input id="custom-radio" 
                                                type="radio" name="custom" value="non-binary" 
                                                checked={this.customGender}/>
                                        </div>
                                    </div>
                                    {genderError ? <p className="error-message"> {this.props.errors.gender} </p> : null }
    
                                    <div className={`${this.customGender ? "" : "hidden"} non-binary-form`}>
                                        <select 
                                            className={`${pronounError ? "input-error" : "input-pending"}`}
                                            value={this.state.pronoun ? this.state.pronoun : "default-option"} 
                                            onChange={this.update("pronoun")}>
                                            <option key="default-option" disabled="disabled" value="default-option"> Select your pronoun </option>
                                            {Object.keys(pronouns).map( pronoun => {
                                                return (
                                                    <option key={pronoun} value={pronoun}> 
                                                        {pronouns[pronoun]} 
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        {pronounError ? <p className="error-message"> {this.props.errors.pronoun} </p> : null }
                                        <div className="fine-print"> Your pronoun is visible to everyone </div>
                                        <input onChange={this.update("gender")} className="custom-gender-input input-pending" type="text" placeholder="Gender (optional)"/>
                                    </div>
                                </div>
                                <div className="footer">
                                    <div className="fine-print">
                                        By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
                                    </div>
                                </div>
                                    
                            </div>
                            <button>Sign Up</button>
                        </form>
                    </div>
                </div>
                

            </div>
                
        )
    }
}