# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
usr = User.create({
    first_name: "Kevin",
    last_name: "Yieh",
    email: "kevyieh@gmail.com",
    password: "password",
    birthdate: "1997/02/20",
    gender: "male"
})