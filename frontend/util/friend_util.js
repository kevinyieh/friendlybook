export const fetchFriends = user => {
    return $.ajax({
        method: "GET",
        url: "/api/friends",
        data: {user}
    })
}

export const fetchFriendRequests = () => {
    return $.ajax({
        method:"GET",
        url: "/api/friend_requests"
    })
}