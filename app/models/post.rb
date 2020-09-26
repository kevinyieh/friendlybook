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
    
    # def organized_comments
    #     Comment.find_by_sql(["
    #         SELECT
    #             comments.*
    #         FROM comments
    #         WHERE comments.post_id = ? AND comments.source IS NULL", self.id])
    # end
    
end