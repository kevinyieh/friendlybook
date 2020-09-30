class Api::CommentsController < ApplicationController
    def create
        new_comment_params = comment_params
        new_comment_params[:user_id] = current_user.id
        @comment = Comment.new(new_comment_params)
        @post = Post.find_by(id: new_comment_params[:post_id])
        if @post
            if @comment.save
                redirect_to "/api/posts/#{new_comment_params[:post_id]}"
            else
                render json: ["Couldn't save comment"]
            end
        else
            render json: ["Couldn't find post"]
        end
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment
            @comment.update(comment_params)
            redirect_to "/api/posts/#{@comment.post_id}", status 303
        else
            render json: ["Comment not found"]
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment 
            @comment.destroy!
            @post = Post.retrieve_post(@comment.post_id)
            render "/api/posts/show.json.jbuilder"
        else
            render json: ["Comment not found"]
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:comment,:post_id,:parent_comment_id,:source)
    end
end