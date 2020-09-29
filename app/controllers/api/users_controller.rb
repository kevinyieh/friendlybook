class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            @user.pfp.attach(io: File.open(Rails.root.join("app","assets","images","default_pfp.png").to_s), filename: "default_pfp.png")
            login!(@user)
            render :show
        else
            render json: {login: {}, signup: @user.errors.messages}, status: 401
        end
    end
    def index 
        @users = User.select("users.*")
                    .where("users.id IN (?)",params[:users])
                    .with_attached_pfp
        render :index
    end
    def show
        @user = User.find_by(id: params[:id])
        if @user 
            render :show
        else
            render json: ["User not found"]
        end
    end
    private
    def user_params
        params.require(:user).permit(:first_name,:last_name,:email,:password,:birthdate,:gender,:pronoun)
    end
end