import { useRef, useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendLoading, sendMessage } = useSendMessage();
  const textareaRef = useRef();

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const maxRows = 5; // Maximum number of rows
      const lineHeight = 16; // Height of one line
      const maxHeight = maxRows * lineHeight; // Maximum height based on maxRows and lineHeight
      textareaRef.current.style.height = 'auto'; // Reset height to 'auto'
      const currentHeight = textareaRef.current.scrollHeight; // Current scrollHeight
      const newHeight = Math.min(currentHeight, maxHeight); // New height capped by maxHeight
      textareaRef.current.style.height = newHeight + "px"; // Set height to newHeight
      textareaRef.current.style.overflowY = currentHeight > maxHeight ? "auto" : "hidden"; // Conditionally apply overflow-y property
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);


  const handleSubmit = async e => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="w-full relative flex">
        <textarea
          ref={textareaRef}
          id="messageTextArea"
          className="h-auto border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white ml-5 mr-9 resize-none"
          rows={1}
          placeholder="Send a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={sendLoading}>
          {sendLoading ? <div className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;