class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :description
      t.timestamps
    end

    add_index :feeds, :title
    add_index :feeds, :url
  end
end
