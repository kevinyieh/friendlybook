class AlterUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pronoun, :string
  end
end
