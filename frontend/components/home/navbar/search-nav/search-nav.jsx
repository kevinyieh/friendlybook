import React from "react";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent: "",
            dropped: null
        }
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount(){
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousedown",this.handleMouseDown);
    }
    componentWillUnmount(){
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousedown",this.handleMouseDown);
    }
    updateSearch(e){
        this.setState({
            searchContent: e.currentTarget.value
        })
    }

    handleMouseUp(e){
        if(e.target === this.searchContainer){
            this.setState({
                dropped: true
            })
        }
    }

    handleMouseDown(e){
        if(this.searchContainer && !this.searchContainer.contains(e.target) ){
            this.setState({
                dropped: null
            })
        }
    }
    render(){
        return(
            <div className={`${this.state.dropped ? "dropped" : ""} search-container`} ref={node => this.searchContainer = node}>
                <input 
                    onChange={this.updateSearch}
                    type="input" 
                    placeholder="Search Friendlybook" 
                    value={this.state.searchContent} />
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <ul className={`${this.state.dropped ? "" : "hidden"} search-query`}>
                    
                </ul>
            </div>
        )
    }

}