json.id @post.id
json.post @post.post
json.wallId @post.wall_id
json.userId @post.user_id
json.createdAt @post.created_at
json.photo url_for(@post.photo)