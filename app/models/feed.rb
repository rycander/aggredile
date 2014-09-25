class Feed < ActiveRecord::Base
  validates :title, :url, presence: true

  has_many :user_feeds, dependent: :destroy
  has_many :users, through: :user_feeds


  def self.find_or_create_by_url(url)
    feed = Feed.find_by_url(url);
    unless (feed)
      feed = Feedjira::Feed.fetch_and_parse(url);
      #TODO: entries
    end
    feed
  end
end
