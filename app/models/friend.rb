class Friend < ApplicationRecord
    validates :user_id,:friend_id, presence: true
    validates :pending, inclusion: { in: [true,false] } 
    validates :friend_id, uniqueness: { scope: :user_id }

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
end