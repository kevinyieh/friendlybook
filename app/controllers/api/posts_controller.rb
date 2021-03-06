class Api::PostsController < ApplicationController
    def index
        @posts = Post.retrieve_posts(params[:user_id])
        render partial: "/api/posts/index.json.jbuilder", locals: { feed: @posts }
    end

    def create
        new_post_params = posts_params
        new_post_params.delete(:id)
        new_post_params[:user_id] = current_user.id
        @post = Post.new(new_post_params)
        if @post.save 
            current_user.photos.attach([new_post_params[:photo]]) if new_post_params[:photo]
            render :basic_show
        else
            render json: {post: @post.errors.messages}, status: 401
        end
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        if @post
            if current_user.id === @post.user_id
                @post.destroy!
                render :basic_show
            else
                render json: ["Unathorized user"], status: 401
            end
        else
            render json: ["Couldn't find post."], status: 404
        end
    end

    def update
        @post = Post.find_by(id: posts_params[:id])
        if @post
            if current_user.id === @post.user_id
                new_posts_params = posts_params
                if new_posts_params[:photo].is_a?(String)
                    new_posts_params.delete(:photo)
                elsif new_posts_params[:photo].nil?
                    @post.photo.purge if @post.photo.attached?
                end
                @post.update(new_posts_params)
                @post = Post.retrieve_post(@post.id)
                render :show
            else
                render json: ["Unathorized user"]
            end
        else
            render json: ["Couldn't find post."]
        end
    end

    def show 
        @post = Post.retrieve_post(params[:id])
        if @post
            render :show
        else
            render json: ["Couldn't find post"]
        end
    end

    private
    def posts_params
        params.require(:post).permit(:wall_id,:post,:photo,:id)
    end
end