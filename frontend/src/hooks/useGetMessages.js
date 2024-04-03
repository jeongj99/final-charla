import { useEffect } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation, messageLoading, setMessageLoading } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setMessageLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setMessageLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessageLoading, setMessages]);

  return { messages, messageLoading };
};

export default useGetMessages;