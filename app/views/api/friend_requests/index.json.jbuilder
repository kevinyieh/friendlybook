@friendrequests.each do |req|
    json.set! req.id do
        json.id req.id
        json.userId req.user_id
        json.friendId req.friend_id
        json.pending req.pending
        json.createdAt req.created_at
    end
end