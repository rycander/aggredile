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

require 'test_helper'

class UserFeedTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
