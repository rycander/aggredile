class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_id, null: false
      t.boolean :guest, null: false, default: false

      t.timestamps
    end

    add_index :users, :session_id
    add_index :users, :username
  end
end
