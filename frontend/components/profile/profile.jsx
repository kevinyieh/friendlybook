import React from "react";
import { withRouter } from "react-router-dom";

class Profile extends React.Component{
    render(){
        console.log(this.props);
        return(
            <div>
                Profile Page
            </div>
        )
    }
        
}

export default withRouter(Profile);