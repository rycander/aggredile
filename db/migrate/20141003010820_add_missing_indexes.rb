class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :entry_visits, :user_id
    add_index :entry_visits, [:user_id, :user_id]
  end
end
