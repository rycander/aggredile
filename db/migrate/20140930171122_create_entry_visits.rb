class CreateEntryVisits < ActiveRecord::Migration
  def change
    create_table :entry_visits do |t|
      t.integer :user_id, null: false
      t.integer :entry_id, null: false
      t.timestamps
    end
  end
end
