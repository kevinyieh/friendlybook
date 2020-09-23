import React from "react";

export default class CreateDropdown extends React.Component{
    constructor(props){
        super(props);
        this.name = "create";
    }
    render(){
        return (
            <ul className={`${this.props.drop === this.name ? "" : "hidden"} dropdown-list create-drop-list`}
                ref={node => this.dropdownList=node }>
                <h1> Create </h1>
            </ul>
        )
            
    }
}