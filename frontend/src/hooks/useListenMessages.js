import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, conversations, setConversations, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", ({ newMessage, myInfo }) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();

      const index = conversations.findIndex(conv => conv._id === myInfo._id);
      if (index !== -1) {
        const updatedConversations = conversations.filter(conv => conv._id !== myInfo._id);
        setConversations([myInfo, ...updatedConversations]);
      } else {
        setConversations([myInfo, ...conversations]);
      }

      if (selectedConversation._id === newMessage.receiverId)
        setMessages([...messages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages, messages, setConversations, conversations, selectedConversation._id]);
};

export default useListenMessages;
