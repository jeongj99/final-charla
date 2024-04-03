import { useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetConversations = () => {
  const { conversations, setConversations, conversationLoading, setConversationLoading } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setConversationLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setConversationLoading(false);
      }
    };
    getConversations();
  }, [setConversationLoading, setConversations]);

  return { conversationLoading, conversations, setConversations };
};

export default useGetConversations;