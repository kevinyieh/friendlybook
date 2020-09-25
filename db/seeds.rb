# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([{
    first_name: "Demo",
    last_name: "Person",
    email: "demo@demo.com",
    password: "password",
    birthdate: "2000/01/01",
    gender: "female",
    pronoun: "she/her"
}])

usr = User.create({
    first_name: "John",
    last_name: "Smith",
    email: "johnsmith@demo.com",
    password: "password",
    birthdate: "1997/03/10",
    gender: "male",
    pronoun: "he/him"
})

usr = User.create({
    first_name: "Joanne",
    last_name: "Daggers",
    email: "joannedaggers@demo.com",
    password: "password",
    birthdate: "1999/05/18",
    gender: "female",
    pronoun: "she/her"
})

usr = User.create({
    first_name: "Jordan",
    last_name: "Samuel",
    email: "jordansamuel@demo.com",
    password: "password",
    birthdate: "1990/12/29",
    gender: "male",
    pronoun: "he/him"
})