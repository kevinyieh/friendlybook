json.extract! user, :id
json.firstName user.first_name
json.lastName user.last_name
# Consider refactoring to have pronoun be sent as a key pointing to array