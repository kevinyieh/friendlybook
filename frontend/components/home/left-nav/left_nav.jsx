import React from "react";
import { Redirect, Link } from "react-router-dom";

export default class LeftNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidUpdate(){
        if (this.state.redirect){
            this.setState({
                redirect: false
            })
        }
    }

    componentWillUnmount(){
        this.setState({
            redirect: false
        })
    }

    allRedirects(){
        const full_name = `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`
        return {    
                    [full_name]: {  url: `#/users/${this.props.currentUser.id}`,
                                icon: <i className="fas fa-user left-nav-icon" />,
                                newPage: false},
                    Friends: {  url: "#/friends",
                                icon: <i className="fas fa-user-friends" />,
                                newPage: false},
                    Github: {url: "//github.com/kevinyieh/friendlybook",
                                icon: <i className="fab fa-github" />,
                                newPage: true},
                    LinkedIn: {url: "#",
                                icon: <i className="fab fa-linkedin-in" />,
                                newPage: true},
                    Angel: {url: "#",
                                icon: <i className="fab fa-angellist" />,
                                newPage: true},
                    GithubIO: {url: "#",
                                icon: <i className="far fa-user" />,
                                newPage: true}
                        }
    }

    render(){
        const redirects = this.allRedirects();
        return (
            <div className="left-spacer">
                <ul className="left-nav">
                    {Object.keys(redirects).map( label => {
                            return (
                                <a href={redirects[label].url} key={label}> 
                                    <div className="left-nav-icon">
                                        {redirects[label].icon}
                                    </div>
                                    <p> {label} </p> 
                                </a>
                            )
                    })}
                </ul>
            </div>
        )
            
    }
}