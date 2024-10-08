import { Send } from "lucide-react";
import useSendMessages from "../../hooks/useSendMessages";
import { useState } from "react";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessages();
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 mb-3" onSubmit={handleSendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <Send className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
