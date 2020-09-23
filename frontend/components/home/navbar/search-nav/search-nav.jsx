import React from "react";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent: ""
        }
    }
    render(){
        return(
            <div className="search-container">
                <input type="search" placeholder="Search Friendlybook"></input>
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
            </div>
        )
    }

}