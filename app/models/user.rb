class User < ApplicationRecord
    validates :email, uniqueness: true
    validates :first_name, :last_name, :email, :password_digest, :birthdate, :gender, :pronoun, presence: true
    validates :password, length: { minimum: 6}, allow_nil: true
    
    attr_reader :password
    
    after_initialize :ensure_session_token

    has_many :posts,
        primary_key: :id,
        foreign_key: :user_id 
    
    def wall_posts()
        User.find_by_sql(["
                            SELECT
                                posts.*
                            FROM posts
                            WHERE posts.user_id = ? OR posts.wall_id = ?", self.id, self.id])
    end

    def news_feed_posts()   
        Post.find_by_sql([" 
                                    SELECT DISTINCT
                                        posts.id, posts.post,posts.wall_id, users.id as user_id , users.first_name, users.last_name, posts.created_at
                                    FROM posts
                                    JOIN users ON users.id = posts.user_id
                                    LEFT OUTER JOIN friends as f1 ON f1.user_id = users.id
                                    LEFT OUTER JOIN friends as f2 ON f2.friend_id = users.id
                                    WHERE (f1.friend_id = ? OR f2.user_id = ? OR users.id = ?) AND (f1.pending = FALSE OR f2.pending = FALSE)
                                    ORDER BY posts.created_at DESC", self.id,self.id,self.id])       
    end

    def friends()
        User.find_by_sql(["
                            SELECT
                                users.*
                            FROM users
                            LEFT OUTER JOIN friends as f1 ON f1.user_id = users.id
                            LEFT OUTER JOIN friends as f2 ON f2.friend_id = users.id
                            WHERE (f1.friend_id = ? OR f2.user_id = ?) AND (f1.pending = FALSE OR f2.pending = FALSE) AND users.id != ?
                            ORDER BY users.id ASC", self.id,self.id,self.id])         
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
