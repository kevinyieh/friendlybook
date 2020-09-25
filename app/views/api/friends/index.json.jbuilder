# json.array! @friends do |friend|
#     json.id friend.id
#     json.firstName friend.first_name
#     json.lastName friend.last_name
# end
json.partial! "/api/users/index", users: @friends