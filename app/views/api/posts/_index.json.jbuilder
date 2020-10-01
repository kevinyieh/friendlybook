feed.each do |post|
    json.set! post.id do
        json.id post.id
        json.post post.post
        json.wallId post.wall_id
        json.userId post.user_id
        json.photo post.photo.attached? ? url_for(post.photo) : ""
        json.createdAt post.created_at
        json.totalComments post.total_comments
        json.likes do
            post.likes.each do |like|
                json.set! like.id do
                    json.id like.id
                    json.userId like.user_id
                end
            end
        end
        json.comments do 
            post.comments.each do |comment|
                next if comment.source 
                json.set! comment.id do 
                    json.id comment.id
                    json.comment comment.comment
                    json.postId comment.post_id
                    json.userId comment.user_id
                    json.parentCommentId comment.parent_comment_id
                    json.createdAt comment.created_at
                    json.subComments do 
                        comment.sub_comments.each do |sub_comment|
                                json.set! sub_comment.id do 
                                    json.id sub_comment.id
                                    json.comment sub_comment.comment
                                    json.postId sub_comment.post_id
                                    json.userId sub_comment.user_id
                                    json.parentCommentId sub_comment.parent_comment_id
                                    json.createdAt sub_comment.created_at
                                end
                        end
                    end
                    json.likes do 
                        comment.likes.each do |like|
                            json.set! like.id do
                                json.id like.id
                                json.userId like.user_id
                            end
                        end
                    end
                end
            end
        end
    end
end