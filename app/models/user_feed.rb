# == Schema Information
#
# Table name: user_feeds
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  feed_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class UserFeed < ActiveRecord::Base
  validates :feed_id, uniqueness: {scope: :user_id}
  belongs_to(:feed)
  belongs_to(:user)
end
