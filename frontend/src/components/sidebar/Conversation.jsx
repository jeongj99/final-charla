import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Conversation = ({ conversation, lastIdx, lastMessage }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-1 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="w-28 text-xs text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap">{`${lastMessage.senderId === authUser._id ? "You:" : ""} ${lastMessage.message}`}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;