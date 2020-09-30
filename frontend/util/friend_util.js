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

export const acceptFriendRequest = (id) => {
    return $.ajax({
        method:"PUT",
        url:`/api/friend_requests/${id}`
    })
}

export const rejectFriendRequest = (id) => {
    return $.ajax({
        method:"DELETE",
        url:`/api/friend_requests/${id}`
    })
}