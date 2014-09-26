class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.text :content
      t.datetime :published_at, null: false
      t.integer :feed_id, null: false

      t.timestamps
    end

    add_index :entries, :feed_id
    add_index :entries, :published_at
  end
end
