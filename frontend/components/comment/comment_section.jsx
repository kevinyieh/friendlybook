import React from "react";
import CommentContainer from "./comment_container";

export default function( { comments }){
    if (!comments) return null;
    return (
        <div className="comments">
            {
                comments.map( (comment) => {
                    return <CommentContainer 
                        key={`comment-${comment.id}`} 
                        comment={comment}
                        subComments={comment.subComments}
                        />
                })
            }
        </div>
    )
}