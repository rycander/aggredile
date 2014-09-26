class Feed < ActiveRecord::Base
  validates :title, :url, presence: true

  has_many :user_feeds, dependent: :destroy
  has_many :users, through: :user_feeds
  has_many :entries

  def self.find_or_create_by_url(url)
    feed = Feed.find_by_url(url);
    unless (feed)
      f = Feedjira::Feed.fetch_and_parse(url)
      feed = Feed.create!(title: f.title, url: url)
      f.entries.each do |entry|
        Entry.create_from_json!(entry,feed)
      end
    end
    feed
  end

  def latest_entries
    reload if updated_at < 30.seconds.ago
    entries
  end

  def reload
    f = Feedjira::Feed.fetch_and_parse(url)
    self.title = f.title
    save!

    existing_entries = Entry.pluck(:url).sort
    f.entries.each do |entry|
      unless existing_entries.include?(entry.url)
        Entry.create_from_json!(entry, self)
      end
    end

    self
  end
end
