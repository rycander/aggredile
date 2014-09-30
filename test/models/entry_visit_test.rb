# == Schema Information
#
# Table name: entry_visits
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  entry_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'test_helper'

class EntryVisitTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
