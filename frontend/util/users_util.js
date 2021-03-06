export const login = user => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: {user}
    })
} 

export const logout = user => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session",
    })
} 

export const signup = user => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: {user}
    })
} 

export const fetchUsers = users => {
    return $.ajax({
        method: "GET",
        url: "/api/users",
        data: {users}
    })
}

export const fetchUser = id => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}`
    })
}