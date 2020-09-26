class Api::PostsController < ApplicationController
    def create
        new_post_params = posts_params
        new_post_params[:user_id] = current_user.id
        @post = Post.new(new_post_params);
        if @post.save 
            render :show
        else
            render json: {post: @post.errors.messages}, status: 401
        end
    end

    private
    def posts_params
        params.require(:post).permit(:wall_id,:post)
    end
end