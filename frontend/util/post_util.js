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