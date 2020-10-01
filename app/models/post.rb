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
    
    has_many :likes,
        as: :likeable
    
    has_one_attached :photo

    def self.retrieve_post(post_id)
        Post.with_attached_photo
            .includes(:likes)
            .select("posts.id, posts.post, posts.user_id,
            posts.wall_id, posts.created_at, 
            COUNT(DISTINCT comments.id) as total_comments")
            .left_outer_joins(:comments)
            .group("posts.id")
            .order("posts.created_at DESC")
            .where("posts.id = (?)",post_id).includes(comments: [{sub_comments: :likes},:likes])
            .first
    end

    def self.retrieve_posts(user_id)
        Post.with_attached_photo
            .includes(:likes)
            .select("posts.id, posts.post, posts.user_id,
            posts.wall_id, posts.created_at, 
            COUNT(DISTINCT comments.id) as total_comments")
            .left_outer_joins(:comments)
            .group("posts.id")
            .order("posts.created_at DESC")
            .where("posts.wall_id = (?)",user_id).includes(comments: [{sub_comments: :likes},:likes])
    end
    
end