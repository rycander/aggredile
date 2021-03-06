# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  guest           :boolean          default(FALSE), not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true

  attr_reader :password
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many :user_feeds, dependent: :destroy
  has_many :feeds, through: :user_feeds
  has_many :entries, through: :feeds
  has_many :entry_visits, dependent: :destroy
  has_many :viewed_entries, through: :entry_visits

  def User.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    return unless password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_session_token
    self.save!
    self.session_token
  end

  private

  def generate_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token || generate_session_token
  end
end
