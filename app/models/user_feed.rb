class UserFeed < ActiveRecord::Base
  belongs_to(:feeds)
  belongs_to(:users)
end
