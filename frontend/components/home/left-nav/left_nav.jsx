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
                    [full_name]: {  url: `/users/${this.props.currentUser.id}`,
                                icon: <i className="fas fa-user left-nav-icon" />},
                    Friends: {  url: "/friends",
                                icon: <i className="fas fa-user-friends" />}
                }
    }

    render(){
        const redirects = this.allRedirects();
        return (
            <div className="left-spacer">
                <ul className="left-nav">
                    {Object.keys(redirects).map( label => {
                        return <Link to={redirects[label].url} key={label}> 
                                    <div className="left-nav-icon">
                                        {redirects[label].icon}
                                    </div>
                                    <p> {label} </p> 
                                </Link>
                    })}
                </ul>
            </div>
        )
            
    }
}