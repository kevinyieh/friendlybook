class AddColToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :source, :integer
  end
end
