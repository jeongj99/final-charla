import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({ participants: loggedInUserId }).populate({
      path: 'messages',
      options: { sort: { createdAt: -1 } }
    });

    const participantIds = conversations.flatMap(conversation =>
      conversation.participants.map(participant => participant.toString())
    ).filter(id => id !== loggedInUserId.toString());

    const filteredUsers = await User.find({ _id: { $in: participantIds } }).select("-password");

    const usersWithLastMessage = filteredUsers.map(user => {
      const conversation = conversations.find(conv => conv.participants.includes(user._id));
      const lastMessage = conversation ? (conversation.messages.length > 0 ? conversation.messages[0] : null) : null;
      return { ...user.toObject(), lastMessage };
    });

    usersWithLastMessage.sort((a, b) => {
      const timestampA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const timestampB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return timestampB - timestampA; // Sort in descending order (most recent first)
    });

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSearchedUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const searchQuery = req.query.q; // Assuming the search query is provided as a query parameter named 'q'

    // Perform user search based on the search query
    const searchedUsers = await User.find({
      _id: { $ne: loggedInUserId }, // Exclude the logged-in user from search results
      username: { $regex: new RegExp(searchQuery, "i") } // Case-insensitive search by user's full name
    }).select("-password");

    res.status(200).json(searchedUsers);
  } catch (error) {
    console.log("Error in getSearchedUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
