import {connect} from "react-redux";
import MiniPhotos from "./mini_photos";

const mSTP = (state,ownProps) => {
    return {
        photos: ownProps.photos
    }
}

const mDTP = dispatch => {
    return {

    }
}

export default connect(mSTP,mDTP)(MiniPhotos);