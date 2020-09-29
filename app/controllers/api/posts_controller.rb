class Api::PostsController < ApplicationController
    def index
        @posts = Post.retrieve_posts(params[:user_id])
        render partial: "/api/posts/index.json.jbuilder", locals: { feed: @posts }
    end

    def create
        new_post_params = posts_params
        new_post_params[:user_id] = current_user.id
        @post = Post.new(new_post_params)
        if @post.save 
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
        @post = Post.find_by(id: params[:id])
        if @post
            if current_user.id === @post.user_id
                @post.update(posts_params)
                render :show
            else
                render json: ["Unathorized user"]
            end
        else
            render json: ["Couldn't find post."]
        end
    end

    def show 
        @post = Post.retrieve_post(params[:id])[0]
        if @post
            render :show
        else
            render json: ["Couldn't find post"]
        end
    end

    private
    def posts_params
        params.require(:post).permit(:wall_id,:post)
    end
end