class Api::WallpapersController < ApplicationController
    def create
        current_user.wallpaper.attach(params[:wallpaper])
        @user = User.with_attached_pfp
                    .with_attached_photos
                    .with_attached_wallpaper
                    .find(current_user.id)
        render "/api/users/show"
    end
    def destroy
        current_user.wallpaper.purge
        @user = User.with_attached_pfp
                    .with_attached_photos
                    .with_attached_wallpaper
                    .find(current_user.id)
        render "/api/users/show"
    end
end