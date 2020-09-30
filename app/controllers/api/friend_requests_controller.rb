class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = Friend.select("friends.*")
                            .where("friends.pending = true AND (friends.user_id = ? OR friends.friend_id=?)",
                            current_user.id,current_user.id)
        render :index
    end

    def update 
        @friend_request = Friend.find_by(id: params[:id])
        if @friend_request
            @friend_request.update(pending: false)
            redirect_to api_friend_requests_url, status: 303
        else
            render json: ["Couldn't find friend request"]
        end
    end
    
    def destroy
        @friend_request = Friend.find_by(id: params[:id])
        if @friend_request
            @friend_request.destroy!
            redirect_to api_friend_requests_url, status: 303
        else
            render json: ["Couldn't find friend request"]
        end
    end
end