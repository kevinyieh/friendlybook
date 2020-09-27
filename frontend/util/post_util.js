export const fetchNewsfeed = () => {
    return $.ajax({
        method: "GET",
        url: "/api/newsfeed"
    })
}

export const createPost = (post) => {
    return $.ajax({
        method:"POST",
        url:"/api/posts",
        data: {post}
    })
}

export const deletePost = (id) => {
    return $.ajax({
        method:"DELETE",
        url:`/api/posts/${id}`
    })
}

export const editPost = (post) => {
    return $.ajax({
        method:"PUT",
        url:`/api/posts/${post.id}`,
        data: {post}
    })
}