export const createComment = comment => {
    return $.ajax({
        method:"POST",
        url: "/api/comments",
        data: {comment}
    })
}

export const deleteComment = id => {
    return $.ajax({
        method:"DELETE",
        url: `/api/comments/${id}`,
    })
}

export const editComment = comment => {
    return $.ajax({
        method:"PUT",
        url: `/api/comments/${comment.id}`,
        data: {comment}
    })
}