class RemoveIndexFromFriends < ActiveRecord::Migration[5.2]
  def change
    remove_index :friends, name: "index_friends_on_friend_id"
    remove_index :friends, name: "index_friends_on_user_id"
  end
end
