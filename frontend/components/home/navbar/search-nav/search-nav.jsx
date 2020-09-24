import React from "react";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchContent: "",
            dropped: null
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
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
        if(this.searchInput.contains(e.target)){
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

    closeSearch(e) {
        this.setState({
            dropped: null
        })
    }
    render(){
        return(
            <div className={`${this.state.dropped ? "dropped" : ""} search-container`} ref={node => this.searchContainer = node}>
                <div className="header-search-container">
                    <div className="back-arrow">
                        <i onClick={this.closeSearch} className={`${this.state.dropped ? "" : "hidden"} fas fa-arrow-left`} />
                    </div>
                    
                    <div className="search-bar">
                        <input 
                            ref={node => this.searchInput = node}
                            onChange={this.updateSearch}
                            type="input" 
                            placeholder="Search Friendlybook" 
                            value={this.state.searchContent} />
                        <div className="search-icon">
                            <i className="fas fa-search" />
                        </div>
                    </div>
                </div>
                    
                <ul className={`${this.state.dropped ? "" : "hidden"} search-query`}>
                    
                </ul>
            </div>
        )
    }

}