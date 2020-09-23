import React from "react";

export default class NotificationsDropdown extends React.Component{
    constructor(props){
        super(props);
        this.name = "notifications";
    }
    render(){
        return (
            <ul className={`${this.props.drop === this.name ? "" : "hidden"} dropdown-list notifications-drop-list`}
                ref={node => this.dropdownList=node }>
                <h1> Notifications </h1>
            </ul>
        )
            
    }
}