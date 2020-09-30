import {connect} from "react-redux";
import Profile from "./profile";
import { fetchUser,fetchUsers } from "../../actions/user_actions";
import { fetchWallFeed } from "../../actions/post_actions";
import { fetchFriendRequests, createFriendRequest, rejectFriendRequest, acceptFriendRequest } from "../../actions/friend_actions";

const mSTP = (state,ownProps) => {
    const userId = ownProps.profileSelected ? ownProps.profileSelected : parseInt(ownProps.match.params.userId);
    const friendView = !!ownProps.friendView;
    const user =  state.entities.users[userId];
    const rec = Object.values(state.entities.friendRequests).filter(fr => fr.userId === userId && fr.friendId === state.session.id);
    const req = Object.values(state.entities.friendRequests).filter(fr => fr.userId === state.session.id && fr.friendId === userId);
    const reqId = rec.length === 1 ? rec[0].id : req.length === 1 ? req[0].id : null;
    return {
        currentUser: state.session,
        user,
        userId,
        friendView,
        posts: Object.values(state.entities.posts).sort( (post1,post2) => post1.createdAt > post2.createdAt ? -1 : 1),
        friendRequests: state.entities.friendRequests,
        isFriend: !!state.entities.friends[userId] || rec.length === 1 || req.length === 1 || userId === state.session.id,
        rec,
        req,
        reqId
    }
}

const mDTP = dispatch => {
    return {
        fetchUser: id => fetchUser(id)(dispatch),
        fetchWallFeed: id => dispatch(fetchWallFeed(id)),
        fetchUsers: users => dispatch(fetchUsers(users)),
        fetchFriendRequests: () => fetchFriendRequests()(dispatch),
        createFriendRequest: (id) => createFriendRequest(id)(dispatch),
        rejectFriendRequest: (id) => rejectFriendRequest(id)(dispatch),
        acceptFriendRequest: (id) => acceptFriendRequest(id)(dispatch)
    }
}

export default connect(mSTP,mDTP)(Profile)