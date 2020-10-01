export const likePost = id => {
    return $.ajax({
        method:"POST",
        url:"/api/likes",
        data: {like:{
                        likeable_id: id,
                        likeable_type: "Post"
                    }
            }
    })
}

export const likeComment = id => {
    return $.ajax({
        method:"POST",
        url:"/api/likes",
        data: {like:{
                        likeable_id: id,
                        likeable_type: "Comment"
                    }
            }
    })
}

export const unlikePost = id => {
    return $.ajax({
        method:"DELETE",
        url:"/api/likes/-1",
        data: {like:{
                        likeable_id: id,
                        likeable_type: "Post"
                    }
            }
    })
}

export const unlikeComment = id => {
    return $.ajax({
        method:"DELETE",
        url:"/api/likes/-1",
        data: {like:{
                        likeable_id: id,
                        likeable_type: "Comment"
                    }
            }
    })
}