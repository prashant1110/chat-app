import { useAuth } from "../../context/AuthContext";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuth();
  const fromMe = message?.sednerId === authUser?.id;
  const { selectedConversation } = useConversation();
  console.log(authUser)

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>
        {message?.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};
export default Message;

function extractTime(time: string) {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}.${minutes}`;
}
