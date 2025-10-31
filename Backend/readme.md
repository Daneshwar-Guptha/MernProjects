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

    // try {
    //     let loggedInUser = req.user;
    //     let connections = await Connection.find({
    //         $or: [
    //             { fromUserId: loggedInUser._id, status: "accept" },
    //             { toUserId: loggedInUser._id, status: "accept" },
    //         ],
    //     })
    //         .populate("fromUserId", "firstName lastName")
    //         .populate("toUserId", "firstName lastName");

    //     const myconnections = connections.map((connection) =>
    //         connection.toUserId.equals(loggedInUser._id)
    //             ? connection.fromUserId
    //             : connection.toUserId
    //     );

    //     return res.send(myconnections);
    // } catch (err) {
    //     return res.status(500).json({ message: "Internal server error" });
    // }