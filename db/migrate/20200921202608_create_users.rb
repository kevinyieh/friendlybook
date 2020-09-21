class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, unique: true
      t.date :birthdate, null: false
      t.string :gender

      t.timestamps
    end

    add_index :users, :session_token
    add_index :users, :email
  end
end
