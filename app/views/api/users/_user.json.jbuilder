json.id user.id
json.firstName user.first_name
json.lastName user.last_name
json.pfp user.pfp.attached? ? url_for(user.pfp) : ""
json.photos user.photos.attached? ? user.photos.map {|photo| url_for(photo)} : []
json.wallpaper user.wallpaper.attached? ? url_for(user.wallpaper) : ""