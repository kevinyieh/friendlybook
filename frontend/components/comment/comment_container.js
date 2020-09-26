import { connect } from "react-redux"
import Comment from "./comment";

const mSTP = (state, ownProps) => {
    return {
        users: state.entities.users,
        comment: ownProps.comment,
        subComments: ownProps.subComments
    }
}

// const mDTP = dispatch => {
//     return {

//     }
// }

export default connect(mSTP)(Comment);