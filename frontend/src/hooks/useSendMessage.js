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

      // Update messages state with the new message
      setMessages([...messages, data]);

      // Merge new conversations data with existing conversations and sort by most recent
      const updatedConversations = conversations
        .map(conversation =>
          conversation._id === selectedConversation._id ? { ...conversation, lastMessage: data } : conversation
        )
        .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

      console.log("Updated conversations:", updatedConversations); // Log updated conversations
      setConversations(updatedConversations);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSendLoading(false);
    }
  };

  return { sendLoading, sendMessage };
};

export default useSendMessage;
