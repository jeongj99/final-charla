import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation, conversations, setConversations, sendLoading, setSendLoading } = useConversation();

  const sendMessage = async message => {
    setSendLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);

      const existingConversationIndex = conversations.findIndex(conv => conv._id === selectedConversation._id);
      if (existingConversationIndex !== -1) {
        const updatedConversations = conversations.map((conversation, index) =>
          index === existingConversationIndex ? { ...conversation, lastMessage: data } : conversation
        ).sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

        setConversations(updatedConversations);
      } else {
        const updatedConversations = [
          ...conversations,
          { ...selectedConversation, lastMessage: data }
        ].sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

        setConversations(updatedConversations);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSendLoading(false);
    }
  };

  return { sendLoading, sendMessage };
};

export default useSendMessage;
