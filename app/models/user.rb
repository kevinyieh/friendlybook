class User < ApplicationRecord
    validates :email, uniqueness: true
    validates :first_name, :last_name, :email, :password_digest, :birthdate, :gender, :pronoun, presence: true
    validates :password, length: { minimum: 6}, allow_nil: true
    
    attr_reader :password
    
    after_initialize :ensure_session_token

    has_many :posts,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Post,
        dependent: :destroy
    
    has_many :comments,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Comment,
        dependent: :destroy
    has_many :friends_reqs,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Friend,
        dependent: :destroy

    has_many :friends_backs,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :Friend,
        dependent: :destroy

    has_one_attached :pfp
    has_one_attached :background_image
    has_many_attached :photos
    
    def wall_posts()
        User.find_by_sql(["
            SELECT
                posts.*
            FROM posts
            WHERE posts.user_id = ? OR posts.wall_id = ?", self.id, self.id])
    end

    def news_feed_posts(load=25)  
        posts = Post.find_by_sql([" 
            SELECT DISTINCT
                posts.id, posts.created_at
            FROM posts
            LEFT OUTER JOIN friends as f1 ON f1.user_id =  posts.user_id
            LEFT OUTER JOIN friends as f2 ON f2.friend_id =  posts.user_id
            WHERE (f1.friend_id = ? AND f1.pending = FALSE) OR 
                    (f2.user_id = ? AND f2.pending = FALSE)
                    OR posts.user_id = ?
                    OR posts.wall_id = ?
            GROUP BY posts.id
            ORDER BY posts.created_at DESC
            LIMIT ?", self.id,self.id,self.id,self.id,load])
        post_ids = posts.map { |post| post.id }
        Post.select("posts.id, posts.post, posts.user_id,
            posts.wall_id, posts.created_at, 
            COUNT(DISTINCT comments.id) as total_comments")
            .left_outer_joins(:comments)
            .group("posts.id")
            .order("posts.created_at DESC")
            .where("posts.id IN (?)",post_ids).includes(comments: :sub_comments)
    end

    def friends()
        # User.with_attached_pfp.find_by_sql(["
        #     SELECT DISTINCT
        #         users.*, f1.pending as f1pending, f2.pending as f2pending
        #     FROM users
        #     LEFT OUTER JOIN friends as f1 ON f1.user_id = users.id
        #     LEFT OUTER JOIN friends as f2 ON f2.friend_id = users.id
        #     WHERE ((f1.friend_id = ? AND f1.pending = FALSE) OR 
        #             (f2.user_id = ? AND f2.pending = FALSE)) AND 
        #             users.id != ?
        #     ORDER BY users.id ASC", self.id,self.id,self.id])         
        User.with_attached_pfp
            .left_outer_joins(:friends_reqs)
            .left_outer_joins(:friends_backs)
            .where("((friends.friend_id = ? AND friends.pending = FALSE) OR 
                    (friends_backs_users.user_id = ? AND friends_backs_users.pending = FALSE)) AND 
                    users.id != ?",self.id,self.id,self.id)
            .order("users.id ASC")
            .select("DISTINCT users.*, friends.pending as f1pending, friends_backs_users.pending as f2pending")
    end

    def password=(pw)
        @password = pw
        self.password_digest = BCrypt::Password.create(pw)
    end

    def is_password?(pw)
        BCrypt::Password.new(self.password_digest).is_password?(pw)
    end

    def self.find_by_credentials(em,pw)
        user = User.find_by(email: em)
        return user if user && user.is_password?(pw)
        nil
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
    
    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
# Maybe use save!
        self.save
        self.session_token
    end

end


# def news_feed_posts(num_posts=10)  
#     posts = Post.find_by_sql([" 
#         SELECT DISTINCT
#             posts.id, posts.post, posts.user_id, posts.wall_id, posts.created_at, 
#             COUNT(DISTINCT comments.id) as total_comments
#         FROM posts
#         JOIN users ON users.id = posts.user_id
#         LEFT OUTER JOIN friends as f1 ON f1.user_id = users.id
#         LEFT OUTER JOIN friends as f2 ON f2.friend_id = users.id
#         LEFT OUTER JOIN comments ON comments.post_id = posts.id
#         WHERE (f1.friend_id = ? OR f2.user_id = ? OR users.id = ?) AND (f1.pending = FALSE OR f2.pending = FALSE)
#         GROUP BY posts.id
#         ORDER BY posts.created_at DESC
#         LIMIT ?", self.id,self.id,self.id,num_posts])