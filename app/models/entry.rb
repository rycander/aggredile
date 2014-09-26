class Entry < ActiveRecord::Base
  belongs_to :feed

  def self.create_from_json!(entry, feed)
    Entry.create!({
      url: entry.try(:link) || entry.try(:url),
      published_at: entry.published,
      content: entry.try(:content) || entry.try(:summary),
      title: entry.try(:title),
      feed_id: feed.id
    })
  end
end
