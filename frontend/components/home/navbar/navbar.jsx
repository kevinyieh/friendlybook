import React from "react";
import AccountDropdown from "./side-nav/account_dropdown";
import NotificationsDropdown from "./side-nav/notifications_dropdown";
import MessengerDropdown from "./side-nav/messenger_dropdown";
import CreateDropdown from "./side-nav/create_dropdown";
import Search from "./search-nav/search-nav";
import MainNav from "./main-nav/main_nav";
import { Link } from "react-router-dom";
const elementClickIsOutside = (allDropIcons,clicked) => {
    return !allDropIcons.some( element => element.contains(clicked))
}

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drop: null,
            currentDropList: null
        }
        this.droplists = {};
        this.allDropIcons = {};
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(e) {
        if (elementClickIsOutside(Object.values(this.allDropIcons),e.target) &&
            this.state.currentDropList && 
            !this.state.currentDropList.dropdownList.contains(e.target)){
            this.setState({
                drop: null,
                currentDropList: null
            });
        }
    }
    dropdown(clickedDrop){
        return e => {
            if(this.state.drop === clickedDrop){
                this.setState({
                    drop: null,
                    currentDropList: null
                })
            }else{
                this.setState({
                    drop: clickedDrop,
                    currentDropList: this.droplists[clickedDrop]
                })
            }
            
        }
    }

    render(){
        const pfp = this.props.currentUser.pfp ? this.props.currentUser.pfp : window.defaultPfp;
        return (
            <div className="navbar">
                <div className="search-nav">
                    <Link to="/">
                        <img className="small-logo" src={window.smallLogoUrl}></img>
                    </Link>
                        
                    <Search />
                </div>
    
                <div className="main-nav">
                    <MainNav />
                </div>
                
                <div className="side-nav">
                    <Link to={`/users/${this.props.currentUser.id}`} className="small-profile">
                            <img src={pfp}/>
                            <p> {this.props.currentUser.firstName} </p>
                    </Link>
                    <div className="create">
                        <div onClick={this.dropdown("create")} 
                            className={`drop-create ${this.state.drop === "create" ? "active-dropdown" : ""}`}
                            ref={node => this.allDropIcons["create"] = node}>
                            <i className="fas fa-plus"></i>
                        </div>
                        <CreateDropdown
                            drop={this.state.drop}
                            ref={node => this.droplists["create"] = node}
                        />
                    </div>
                    <div className="messenger">
                        <div onClick={this.dropdown("messenger")} 
                            className={`drop-messenger ${this.state.drop === "messenger" ? "active-dropdown" : ""}`}
                            ref={node => this.allDropIcons["messenger"] = node}>
                            <i className="fas fa-comment-dots" />
                        </div>
                        <MessengerDropdown 
                            drop={this.state.drop}
                            ref={node => this.droplists["messenger"] = node}
                        />
                    </div>
                    <div className="notifications">
                        <div onClick={this.dropdown("notifications")} 
                            className={`drop-bell ${this.state.drop === "notifications" ? "active-dropdown" : ""}`}
                            ref={node => this.allDropIcons["notifications"] = node}>
                            <i className="fas fa-bell" />
                        </div>
                        <NotificationsDropdown 
                            drop={this.state.drop}
                            ref={node => this.droplists["notifications"] = node}
                        />
                    </div>
                    <div className="account">
                        <div onClick={this.dropdown("account")} 
                            className={`drop-carrot ${this.state.drop === "account" ? "active-dropdown" : ""}`}
                            ref={node => this.allDropIcons["account"] = node}>
                            <i className="fas fa-caret-down" />
                        </div>
                        <AccountDropdown 
                                currentUser={this.props.currentUser}
                                logout={this.props.logout} 
                                drop={this.state.drop}
                                ref={node => this.droplists["account"] = node}
                        />
                    </div>
                </div>
            </div>
        )
    }
    
}