import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find conversations involving the logged-in user and populate the 'messages' field
    const conversations = await Conversation.find({ participants: loggedInUserId }).populate({
      path: 'messages',
      options: { sort: { createdAt: -1 } } // Sort messages by createdAt in descending order
    });

    // Extract unique user IDs from conversations excluding the logged-in user
    const participantIds = conversations.flatMap(conversation =>
      conversation.participants.map(participant => participant.toString())
    ).filter(id => id !== loggedInUserId.toString());

    // Find users based on the extracted IDs
    const filteredUsers = await User.find({ _id: { $in: participantIds } }).select("-password");

    // Include the most recent message for each conversation in the filteredUsers array
    const usersWithLastMessage = filteredUsers.map(user => {
      const conversation = conversations.find(conv => conv.participants.includes(user._id));
      const lastMessage = conversation ? (conversation.messages.length > 0 ? conversation.messages[0] : null) : null;
      return { ...user.toObject(), lastMessage };
    });

    // Sort usersWithLastMessage based on the createdAt timestamp of lastMessage
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