import React from "react";

export default class MessengerDropdown extends React.Component{
    constructor(props){
        super(props);
        this.name = "messenger";
    }
    render(){
        return (
            <ul className={`${this.props.drop === this.name ? "" : "hidden"} dropdown-list messenger-drop-list`}
                ref={node => this.dropdownList=node }>
                <h1> Messenger </h1>
            </ul>
        )
            
    }
}