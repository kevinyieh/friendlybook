import React from "react";
import { Link } from "react-router-dom";

export default class AccountDropdown extends React.Component {
    constructor(props){
        super(props);
        this.name = "account";
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logout();
    }
    render(){
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
        return (
            <ul className={`${this.props.drop === this.name ? "" : "hidden"} dropdown-list account-drop-list`}
                ref={node => this.dropdownList=node }>
                <li className="dropdown-profile">
                    <Link to={`/users/${this.props.currentUser.id}`} >
                        <img className="navbar-pfp" src={pfp} />
                        <p> {`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`} </p>
                    </Link>
                </li>
                    

                <div className="separator" />

                <li className="dropdown-settings-privacy"> 
                    <div className="drop-icon-cog">
                        <i className="fas fa-cog"></i> 
                    </div>
                    <div className="label-dropdown">
                        {"Settings & Privacy"}
                    </div>
                    <i className="fas fa-angle-right"></i>
                </li>
                <li className="dropdown-help-support">
                    <div className="drop-icon-help">
                        <i className="fas fa-question-circle"></i>
                    </div>
                    <div className="label-dropdown">
                        {"Help & Support"}
                    </div>
                    <i className="fas fa-angle-right"></i>
                </li>
                <li className="dropdown-darkmode">
                    <div className="drop-icon-dark-mode">
                        <i className="fas fa-moon"></i>
                    </div>
                    <div className="label-dropdown">
                        Dark Mode
                    </div>
                </li>
                <li onClick={this.handleLogout} className="dropdown-logout">
                    <div className="drop-icon-logout">
                        <i className="fas fa-door-open"></i>
                    </div>
                    <div className="label-dropdown">
                        Log Out
                    </div>
                </li>
            </ul>
        )
    }
}