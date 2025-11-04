# API DOCS

## Existing endpoints
### api/v2/users
- GET api/v2/users - returns all users
- GET api/v2/users/(id) - returns user based on ID
- GET api/v2/users/(id)/friends - returns all the user's friends.
- GET api/v2/users/(id)/friends/friendsfriends - (Might be WIP, inspired by facebook's friend's friends finding. Silly looking url though. - Only work on if I have time D:)
- POST api/v2/users - Creates a new user
- POST api/v2/users/(id)/friends - adds a new friend to the user's friendslist. 
- PATCH api/v2/users/(id) - Updates a user by ID
- DELETE api/v2/users/(id) - Deletes a user by ID
### api/v2/chats
- GET api/v2/chats - returns all chatrooms
- GET api/v2/chats/(id) - returns user based on ID
- GET api/v2/chats/(id)/users - returns all users in a chatroom based on ID
- GET api/v2/chats/(id)/messages - returns all messages in a chatroom based on ID (For filling chatrooms with messages)
- POST api/v2/chats - Creates a new chatroom
- POST api/v2/chats/(id)/users - adds a user into a chatroom based on the chatroom id and the user id as abody. {"userId": (id)}
- POST api/v2/cahts/(id)/messages - Creates a chat message in a chatroom based on the chatroom ID. (For posting messages)
- PATCH api/v2/chats/(id) Updates a chatroom by ID
- DELETE api/v2/chats/(id) - Deletes a chatroom by ID