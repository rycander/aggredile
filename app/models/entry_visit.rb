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

class EntryVisit < ActiveRecord::Base
  belongs_to :viewed_entry,
    class_name: "Entry",
    foreign_key: :user_id,
    primary_key: :id

  belongs_to :user
end
