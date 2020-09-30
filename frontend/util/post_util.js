export const fetchNewsfeed = () => {
    return $.ajax({
        method: "GET",
        url: "/api/newsfeed"
    })
}

export const fetchWallFeed = (id) => {
    return $.ajax({
        method: "GET",
        url: "/api/posts",
        data: {user_id: id}
    })
}

export const createPost = post => {
    return $.ajax({
        method:"POST",
        url:"/api/posts",
        data: post,
        contentType: false,
        processData: false
    })
}

export const deletePost = id => {
    return $.ajax({
        method:"DELETE",
        url:`/api/posts/${id}`
    })
}

export const editPost = post => {
    return $.ajax({
        method:"PUT",
        url:`/api/posts/${-1}`,
        data: post,
        contentType: false,
        processData: false
    })
}