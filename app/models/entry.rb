# == Schema Information
#
# Table name: entries
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  url          :string(255)      not null
#  content      :text
#  published_at :datetime         not null
#  feed_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Entry < ActiveRecord::Base
  belongs_to :feed, touch: true
  has_many :entry_visits, dependent: :destroy

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
