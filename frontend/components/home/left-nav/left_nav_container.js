import { connect } from "react-redux";
import LeftNav from "./left_nav";
import { withRouter } from "react-router-dom";

const mSTP = state => {
    const currentUser = state.session
    return {
        currentUser
    }
}

export default withRouter(connect(mSTP)(LeftNav));