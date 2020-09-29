class Api::FriendRequestsController < ApplicationController
    def index
        @friendrequests = Friend.select("friends.*")
                            .where("friends.pending = true AND (friends.user_id = ? OR friends.friend_id=?)",
                            current_user.id,current_user.id)
        render :index
    end
end