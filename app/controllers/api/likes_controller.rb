class Api::LikesController < ApplicationController
    def create 
        new_likes_params = likes_params
        new_likes_params[:user_id] = current_user.id
        @like = Like.new(new_likes_params)
        if @like.save
            @post = find_post_from_like(@like)
            redirect_to api_post_url(@post.id), status: 303
        else 
            render json: @like.errors.messages
        end
    end

    def destroy
        new_likes_params = likes_params
        new_likes_params[:user_id] = current_user.id
        @like = Like.find_by(new_likes_params)
        if @like
            if @like.user_id == current_user.id
                @like.destroy!
                @post = find_post_from_like(@like)
                redirect_to api_post_url(@post.id), status: 303
            else
                render json: ["Unathorized User"], status: 401
            end
        else
            render json: ["Couldn't find like"]
        end
    end
    
    private
    def likes_params
        params.require(:like).permit(:likeable_type,:likeable_id)
    end

    def find_post_from_like(like)
        id = like.likeable_type == "Post" ? like.likeable_id : Comment.find(like.likeable_id).post_id
        return Post.retrieve_post(id)
    end
end