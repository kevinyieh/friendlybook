class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = Friend.select("friends.*")
                            .where("friends.pending = true AND (friends.user_id = ? OR friends.friend_id=?)",
                            current_user.id,current_user.id)
        render :index
    end

    def create
        new_friend_params = friend_params
        new_friend_params[:user_id] = current_user.id
        new_friend_params[:pending] = true
        @friend_request = Friend.new(new_friend_params)
        if @friend_request.save
            redirect_to api_friend_requests_url, status: 303 
        else 
            render json: @friend_request.errors.messages, status: 401
        end
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

    private
    def friend_params
        params.require(:request).permit(:friend_id)
    end
end