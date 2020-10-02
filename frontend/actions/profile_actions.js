import { receiveCurrentUser } from "./session_actions";
import * as ProfileUtils from "../util/profile_util";

export const uploadPfp = formData => dispatch => {
    return ProfileUtils.uploadPfp(formData)
        .then( (user) => dispatch(receiveCurrentUser(user)))
}

export const uploadWallpaper = formData => dispatch => {
    return ProfileUtils.uploadWallpaper(formData)
        .then( (user) => dispatch(receiveCurrentUser(user)))
}