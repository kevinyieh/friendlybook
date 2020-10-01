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

    def friend_params
        params.require(:user).permit(:id)
    end
end