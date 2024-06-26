import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import useListenMessage from "../../hooks/useListenMessages";

const Conversations = () => {
  const { conversationLoading, conversations } = useGetConversations();
  useListenMessage();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          lastMessage={conversation.lastMessage}
        />
      ))}
      {conversationLoading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;