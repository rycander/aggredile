# == Schema Information
#
# Table name: feeds
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  url         :string(255)      not null
#  description :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

require 'test_helper'

class FeedTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
