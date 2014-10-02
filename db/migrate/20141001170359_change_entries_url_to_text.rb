class ChangeEntriesUrlToText < ActiveRecord::Migration
  def up
    change_column :entries, :url, :text
  end

  def down
    change_column :entries, :url, :string
  end
end
