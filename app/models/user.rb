class User < ApplicationRecord
    validates :email, uniqueness: true
    validates :first_name, :last_name, :email, :password_digest, :birthdate, :gender, :pronoun, presence: true
    validates :password, length: { minimum: 6}, allow_nil: true
    
    attr_reader :password
    
    after_initialize :ensure_session_token
    
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
