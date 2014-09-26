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

require 'test_helper'

class EntryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
