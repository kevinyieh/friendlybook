class Comment < ApplicationRecord
    validates :comment, :user_id, :post_id, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :post,
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Post
    
    has_many :sub_comments,
        -> { order(:created_at => :asc)},
        primary_key: :id,
        foreign_key: :source,
        class_name: :Comment,
        dependent: :destroy
        

    belongs_to :parent_comment,
        primary_key: :id,
        foreign_key: :parent_comment_id,
        class_name: :Comment,
        optional: true

    belongs_to :source_comment,
        primary_key: :id,
        foreign_key: :source,
        class_name: :Comment,
        optional: true
end