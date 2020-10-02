class Api::ProfilePicsController < ApplicationController
    def create
        current_user.pfp.attach(params[:pfp])
        @user = User.with_attached_pfp
                    .with_attached_photos
                    .with_attached_wallpaper
                    .find(current_user.id)
        render "/api/users/show"
    end
    def destroy
        current_user.pfp.purge
        @user = User.with_attached_pfp
                    .with_attached_photos
                    .with_attached_wallpaper
                    .find(current_user.id)
        render "/api/users/show"
    end
end