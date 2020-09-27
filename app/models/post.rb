class Post < ApplicationRecord
    validates :post, :user_id, :wall_id, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User 
    
    has_many :comments,
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Comment,
        dependent: :destroy
    
    def self.retrieve_post(post_id)
        Post.select("posts.id, posts.post, posts.user_id,
            posts.wall_id, posts.created_at, 
            COUNT(DISTINCT comments.id) as total_comments")
            .left_outer_joins(:comments)
            .group("posts.id")
            .order("posts.created_at DESC")
            .where("posts.id = (?)",post_id).includes(comments: :sub_comments)
    end
    
end