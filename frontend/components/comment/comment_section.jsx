import React from "react";
import CommentContainer from "./comment_container";

export default function( { comments }){
    // if (comments[0].id === 10) debugger;
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
// renderComments(){
//     if(!this.props.post.comments) return null;
//     let comments = Object.values(this.props.post.comments);
//     let allComments = [];
//     for(let i=0; i<this.state.comments; i++){
//         allComments.push(
//             <CommentContainer 
//                 key={`comment-${comments[i].id}`} 
//                 comment={comments[i]}
//                 subComments={comments[i].subComments}
//                 />
//         )    
//     }
// }