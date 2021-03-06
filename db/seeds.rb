# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.create([{first_name: "Demo",last_name: "Person",email: "demo@demo.com",password: "password",birthdate: "2000/01/01",gender: "female",pronoun: "she/her"}])

# usr = User.create({
#     first_name: "John",
#     last_name: "Smith",
#     email: "johnsmith@demo.com",
#     password: "password",
#     birthdate: "1997/03/10",
#     gender: "male",
#     pronoun: "he/him"
# })

# usr = User.create({
#     first_name: "Joanne",
#     last_name: "Daggers",
#     email: "joannedaggers@demo.com",
#     password: "password",
#     birthdate: "1999/05/18",
#     gender: "female",
#     pronoun: "she/her"
# })

# usr = User.create({
#     first_name: "Jordan",
#     last_name: "Samuel",
#     email: "jordansamuel@demo.com",
#     password: "password",
#     birthdate: "1990/12/29",
#     gender: "male",
#     pronoun: "he/him"
# })

all_users = User.create([{first_name: "Demo",last_name: "Person",email: "demo@demo.com",password: "password",birthdate: "2000/01/01",gender: "female",pronoun: "she/her"},{first_name:"Olivia",last_name:"Andrews",gender:"female",email:"o.andrews@randatmail.com",password:"password",birthdate:"2002/06/24",pronoun:"she/her"},{first_name:"Abigail",last_name:"Gibson",gender:"female",email:"a.gibson@randatmail.com",password:"password",birthdate:"2002/05/06",pronoun:"she/her"},{first_name:"Alen",last_name:"Richards",gender:"male",email:"a.richards@randatmail.com",password:"password",birthdate:"2002/03/18",pronoun:"he/him"},{first_name:"Rebecca",last_name:"Warren",gender:"female",email:"r.warren@randatmail.com",password:"password",birthdate:"2002/01/28",pronoun:"she/her"},{first_name:"Antony",last_name:"Fowler",gender:"male",email:"a.fowler@randatmail.com",password:"password",birthdate:"2001/12/10",pronoun:"he/him"},{first_name:"Adrianna",last_name:"Watson",gender:"female",email:"a.watson@randatmail.com",password:"password",birthdate:"2001/10/22",pronoun:"she/her"},{first_name:"Aston",last_name:"Fowler",gender:"male",email:"a.fowler@randatmail.com",password:"password",birthdate:"2001/09/03",pronoun:"he/him"},{first_name:"Adele",last_name:"Ryan",gender:"female",email:"a.ryan@randatmail.com",password:"password",birthdate:"2001/07/16",pronoun:"she/her"},{first_name:"Violet",last_name:"Murphy",gender:"female",email:"v.murphy@randatmail.com",password:"password",birthdate:"2001/05/28",pronoun:"she/her"},{first_name:"Aston",last_name:"Harris",gender:"male",email:"a.harris@randatmail.com",password:"password",birthdate:"2001/04/09",pronoun:"he/him"},{first_name:"Jacob",last_name:"Adams",gender:"male",email:"j.adams@randatmail.com",password:"password",birthdate:"2001/02/19",pronoun:"he/him"},{first_name:"Julia",last_name:"Thomas",gender:"female",email:"j.thomas@randatmail.com",password:"password",birthdate:"2001/01/01",pronoun:"she/her"},{first_name:"Spike",last_name:"Hall",gender:"male",email:"s.hall@randatmail.com",password:"password",birthdate:"2000/11/13",pronoun:"he/him"},{first_name:"Charlie",last_name:"Williams",gender:"male",email:"c.williams@randatmail.com",password:"password",birthdate:"2000/09/25",pronoun:"he/him"},{first_name:"Nicole",last_name:"Andrews",gender:"female",email:"n.andrews@randatmail.com",password:"password",birthdate:"2000/08/07",pronoun:"she/her"},{first_name:"Alexander",last_name:"Casey",gender:"male",email:"a.casey@randatmail.com",password:"password",birthdate:"2000/06/19",pronoun:"he/him"},{first_name:"Roland",last_name:"Cooper",gender:"male",email:"r.cooper@randatmail.com",password:"password",birthdate:"2000/05/01",pronoun:"he/him"},{first_name:"Alfred",last_name:"Owens",gender:"male",email:"a.owens@randatmail.com",password:"password",birthdate:"2000/03/13",pronoun:"he/him"},{first_name:"Rosie",last_name:"Holmes",gender:"female",email:"r.holmes@randatmail.com",password:"password",birthdate:"2000/01/24",pronoun:"she/her"},{first_name:"Mike",last_name:"Martin",gender:"male",email:"m.martin@randatmail.com",password:"password",birthdate:"1999/12/06",pronoun:"he/him"},{first_name:"Chelsea",last_name:"Moore",gender:"female",email:"c.moore@randatmail.com",password:"password",birthdate:"1999/10/18",pronoun:"she/her"},{first_name:"Patrick",last_name:"Carroll",gender:"male",email:"p.carroll@randatmail.com",password:"password",birthdate:"1999/08/30",pronoun:"he/him"},{first_name:"Edgar",last_name:"Mitchell",gender:"male",email:"e.mitchell@randatmail.com",password:"password",birthdate:"1999/07/12",pronoun:"he/him"},{first_name:"Antony",last_name:"Howard",gender:"male",email:"a.howard@randatmail.com",password:"password",birthdate:"1999/05/24",pronoun:"he/him"},{first_name:"Anna",last_name:"Andrews",gender:"female",email:"a.andrews@randatmail.com",password:"password",birthdate:"1999/04/05",pronoun:"she/her"},{first_name:"Alina",last_name:"Campbell",gender:"female",email:"a.campbell@randatmail.com",password:"password",birthdate:"1999/02/15",pronoun:"she/her"},{first_name:"Kirsten",last_name:"Russell",gender:"female",email:"k.russell@randatmail.com",password:"password",birthdate:"1998/12/28",pronoun:"she/her"},{first_name:"Lucy",last_name:"Perkins",gender:"female",email:"l.perkins@randatmail.com",password:"password",birthdate:"1998/11/09",pronoun:"she/her"},{first_name:"Arthur",last_name:"Williams",gender:"male",email:"a.williams@randatmail.com",password:"password",birthdate:"1998/09/21",pronoun:"he/him"},{first_name:"Ryan",last_name:"Howard",gender:"male",email:"r.howard@randatmail.com",password:"password",birthdate:"1998/08/03",pronoun:"he/him"},{first_name:"Alexia",last_name:"Cole",gender:"female",email:"a.cole@randatmail.com",password:"password",birthdate:"1998/06/15",pronoun:"she/her"},{first_name:"Amelia",last_name:"Baker",gender:"female",email:"a.baker@randatmail.com",password:"password",birthdate:"1998/04/27",pronoun:"she/her"},{first_name:"Abraham",last_name:"Barrett",gender:"male",email:"a.barrett@randatmail.com",password:"password",birthdate:"1998/03/09",pronoun:"he/him"},{first_name:"Myra",last_name:"Hamilton",gender:"female",email:"m.hamilton@randatmail.com",password:"password",birthdate:"1998/01/19",pronoun:"she/her"},{first_name:"Vanessa",last_name:"Cooper",gender:"female",email:"v.cooper@randatmail.com",password:"password",birthdate:"1997/12/01",pronoun:"she/her"},{first_name:"Cadie",last_name:"Brooks",gender:"female",email:"c.brooks@randatmail.com",password:"password",birthdate:"1997/10/13",pronoun:"she/her"},{first_name:"Edgar",last_name:"Richards",gender:"male",email:"e.richards@randatmail.com",password:"password",birthdate:"1997/08/25",pronoun:"he/him"},{first_name:"William",last_name:"Holmes",gender:"male",email:"w.holmes@randatmail.com",password:"password",birthdate:"1997/07/07",pronoun:"he/him"},{first_name:"Thomas",last_name:"Stewart",gender:"male",email:"t.stewart@randatmail.com",password:"password",birthdate:"1997/05/19",pronoun:"he/him"},{first_name:"Dainton",last_name:"Mason",gender:"male",email:"d.mason@randatmail.com",password:"password",birthdate:"1997/03/31",pronoun:"he/him"},{first_name:"Briony",last_name:"Mitchell",gender:"female",email:"b.mitchell@randatmail.com",password:"password",birthdate:"1997/02/10",pronoun:"she/her"},{first_name:"Julia",last_name:"Smith",gender:"female",email:"j.smith@randatmail.com",password:"password",birthdate:"1996/12/23",pronoun:"she/her"},{first_name:"Vivian",last_name:"Anderson",gender:"female",email:"v.anderson@randatmail.com",password:"password",birthdate:"1996/11/04",pronoun:"she/her"},{first_name:"William",last_name:"Adams",gender:"male",email:"w.adams@randatmail.com",password:"password",birthdate:"1996/09/16",pronoun:"he/him"},{first_name:"Kelvin",last_name:"Thomas",gender:"male",email:"k.thomas@randatmail.com",password:"password",birthdate:"1996/07/29",pronoun:"he/him"},{first_name:"Edith",last_name:"Craig",gender:"female",email:"e.craig@randatmail.com",password:"password",birthdate:"1996/06/10",pronoun:"she/her"},{first_name:"Preston",last_name:"Cooper",gender:"male",email:"p.cooper@randatmail.com",password:"password",birthdate:"1996/04/22",pronoun:"he/him"},{first_name:"Ashton",last_name:"Stevens",gender:"male",email:"a.stevens@randatmail.com",password:"password",birthdate:"1996/03/04",pronoun:"he/him"},{first_name:"Jessica",last_name:"Brooks",gender:"female",email:"j.brooks@randatmail.com",password:"password",birthdate:"1996/01/15",pronoun:"she/her"},{first_name:"Aldus",last_name:"Johnston",gender:"male",email:"a.johnston@randatmail.com",password:"password",birthdate:"1995/11/27",pronoun:"he/him"}
])

# all_users.each do |user|
#     if user.id === 1
#         user.pfp.attach(io: File.open(Rails.root.join("app","assets","images","demo_user.jpg").to_s), filename: "demo_user.jpg")
#     else
#         user.pfp.attach(io: File.open(Rails.root.join("app","assets","images","default_pfp.png").to_s), filename: "default_pfp.png")
#     end
# end
all_users[0].pfp.attach(io: File.open(Rails.root.join("app","assets","images","demo_user.jpg").to_s), filename: "demo_user.jpg")
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","demo_user.jpg").to_s), filename: "demo_user.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","cat_engineer.png").to_s), filename: "cat_engineer.png"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","cat_scream.jpg").to_s), filename: "cat_scream.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","dorian_gray.png").to_s), filename: "dorian_gray.png"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","grumpy_cat.png").to_s), filename: "grumpy_cat.png"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","juice_cat.jpg").to_s), filename: "juice_cat.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","saki_box.jpg").to_s), filename: "saki_box.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","sleeping_cat.jpg").to_s), filename: "sleeping_cat.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","smug_cat.png").to_s), filename: "smug_cat.png"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","snack_kitten.jpg").to_s), filename: "snack_kitten.jpg"])
all_users[0].photos.attach([io: File.open(Rails.root.join("app","assets","images","yugi.png").to_s), filename: "yugi.png"])
all_users[0].wallpaper.attach(io: File.open(Rails.root.join("app","assets","images","snack_kitten.jpg").to_s), filename: "snack_kitten.jpg")


Friend.create([{user_id:2,friend_id:1,pending:true},{user_id:1,friend_id:3,pending:false},{user_id:1,friend_id:4,pending:false},{user_id:1,friend_id:5,pending:false},{user_id:1,friend_id:6,pending:false},{user_id:1,friend_id:7,pending:false},{user_id:1,friend_id:8,pending:false},{user_id:1,friend_id:9,pending:false},{user_id:1,friend_id:10,pending:false},{user_id:1,friend_id:11,pending:false},{user_id:1,friend_id:12,pending:false},{user_id:1,friend_id:13,pending:false},{user_id:1,friend_id:14,pending:false},{user_id:1,friend_id:15,pending:false},{user_id:1,friend_id:16,pending:false},{user_id:1,friend_id:17,pending:false},{user_id:1,friend_id:18,pending:false},{user_id:1,friend_id:19,pending:false},{user_id:1,friend_id:20,pending:false},{user_id:1,friend_id:21,pending:false},{user_id:1,friend_id:22,pending:false},{user_id:1,friend_id:23,pending:false},{user_id:1,friend_id:24,pending:false},{user_id:1,friend_id:25,pending:false},{user_id:1,friend_id:26,pending:false},{user_id:1,friend_id:27,pending:false},{user_id:1,friend_id:28,pending:false},{user_id:1,friend_id:29,pending:false},{user_id:1,friend_id:30,pending:false},{user_id:1,friend_id:31,pending:false},{user_id:1,friend_id:32,pending:false},{user_id:1,friend_id:33,pending:false},{user_id:1,friend_id:34,pending:false},{user_id:1,friend_id:35,pending:false},{user_id:1,friend_id:36,pending:false},{user_id:1,friend_id:37,pending:false},{user_id:1,friend_id:38,pending:false},{user_id:1,friend_id:39,pending:false},{user_id:1,friend_id:40,pending:false},{user_id:1,friend_id:41,pending:false},{user_id:1,friend_id:42,pending:false},{user_id:1,friend_id:43,pending:false},{user_id:1,friend_id:44,pending:false},{user_id:1,friend_id:45,pending:false},{user_id:46,friend_id:1,pending:false},{user_id:47,friend_id:1,pending:true},{user_id:48,friend_id:1,pending:true},{user_id:49,friend_id:1,pending:true},{user_id:50,friend_id:1,pending:true}
])

Post.create([{post:"This is my very first post!",user_id:1,wall_id:1},{post:"I'm posting to your wall :)!",user_id:1,wall_id:3},{post:"I'm posting to your wall as well (:!",user_id:3,wall_id:1}])

Comment.create([{comment: "Nice first post!",user_id:5,post_id:1},{comment: "Thanks, means a lot :')",user_id:1,post_id:1,parent_comment_id:1,source:1},{comment: "You deserve it friend <3",user_id:5,post_id:1,parent_comment_id:2,source:1},{comment: "Just stopping by to say hi",user_id:2,post_id:1}])

