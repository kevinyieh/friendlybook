class Api::FriendsController < ApplicationController
    def index
        user = User.find_by(friend_params)
        @friends = user.friends
        if user
            render :index
        else
            render json: ["User not found"], status: 404
        end
    end
    def destroy 
        @friend = Friend.find_by({
            user_id: current_user.id,
            friend_id: params[:id]
        })
        if !@friend
            @friend = Friend.find_by({
                user_id: params[:id],
                friend_id: current_user.id
            })
        end
        if @friend
            @friend.destroy!
            redirect_to action: 'index', user: {id: params[:id]}, status: 303
        else
            render json: {msg: "Friendship not found"}, status: 404
        end
    end

    private

    def friend_params
        params.require(:user).permit(:id)
    end
end