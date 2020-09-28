class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    
        if @user.nil?
            if !User.find_by(email: params[:user][:email])
                render json: {login: {email: "The email you've entered doesn't match any account."}, signup: {}}, status: 401
            else
                render json: {login: {password: "The password you've entered is incorrect."}, signup: {}}, status: 401
            end
        else
            @user = @user.with_attached_pfp
            login!(@user)
            render "/api/users/show"
        end
    end

    def destroy
        if logged_in?
            logout!
            render json: { message: "Logout successful." }
        else
            render json: ["Not logged in"], status: 404
        end
    end

end
