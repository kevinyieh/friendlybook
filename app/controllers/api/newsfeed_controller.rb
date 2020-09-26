class Api::NewsfeedController < ApplicationController
    def index
        @newsfeed = current_user.news_feed_posts()
        render :index
    end
end