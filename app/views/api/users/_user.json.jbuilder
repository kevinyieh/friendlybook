json.id user.id
json.firstName user.first_name
json.lastName user.last_name
json.pfp user.pfp.attached? ? url_for(user.pfp) : ""