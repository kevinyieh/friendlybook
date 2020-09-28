class AddIndexToTables < ActiveRecord::Migration[5.2]
  def change
    add_index :comments, :user_id
    add_index :comments, :post_id
    add_index :comments, :parent_comment_id
    add_index :comments, :source
    add_index :friends, :user_id
    add_index :friends, :friend_id
    add_index :posts, :user_id
    add_index :posts, :wall_id
  end
end
