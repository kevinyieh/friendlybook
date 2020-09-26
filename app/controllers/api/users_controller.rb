class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: {login: {}, signup: @user.errors.messages}, status: 401
        end
    end
    def index 
        @users = User.select("users.*")
                    .where("users.id IN (?)",params[:users])
        render :index
    end
    private
    def user_params
        params.require(:user).permit(:first_name,:last_name,:email,:password,:birthdate,:gender,:pronoun)
    end
end