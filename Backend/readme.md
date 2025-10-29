authRouter

POST /register
POST /login
POST /logout
profileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/password
connectionRequestRouter

POST /request/send/:interested/:userId

POST /request/send/:ignored/:userId

POST /request/review/accepted/:requestId

POST /request/review/rejected/:requestId

GET /user/connections // accepted

GET /user/received // friend request

GET /user/feed // reamining users 