import friendRequestModel from '../models/FriendRequest.model.js';
import userModel from '../models/User.model.js';

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await userModel.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        { _id: { $nin: currentUser.friends || [] } }, // Exclude friends
        { isOnboarded: true } // Only include onboarded users
      ]
    });
    res.status(200).json({ recommendedUsers });
  }
  catch (error) {
    console.log("Error in getRecommendedUsers controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function getMyFriends(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json({ friends: user.friends });
  }
  catch (error) {
    console.log("Error in getMyFriends controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId == recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    // Find the recipient
    const recipient = await userModel.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if the recipient is already a friend
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // Check if a friend request already exists
    const existingRequest = await friendRequestModel.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    const friendRequest = await friendRequestModel.create({
      sender: myId,
      recipient: recipientId
    });

    res.status(201).json({ friendRequest });
  }

  catch (error) {
    console.log("Error in sendFriendRequest controller:", error);
    res.status(500).json({ message: "Internal Server Error" });

  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await friendRequestModel.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this friend request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exists
    await userModel.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });

    await userModel.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: "Friend request accepted" });
  }

  catch (error) {
    console.log("Error in acceptFriendRequest controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await friendRequestModel.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await friendRequestModel.find({
      sender: req.user.id,
      status: "accepted"
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingRequests, acceptedRequests });
  }
  catch (error) {
    console.log("Error in getFriendRequests controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await friendRequestModel.find({
      sender: req.user.id,
      status: "pending"
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json({ outgoingRequests });
  }

  catch (error) {
    console.log("Error in getOutgoingFriendRequests controller:", error);
    res.status(500).json({ message: "Internal Server Error" });

  }
}