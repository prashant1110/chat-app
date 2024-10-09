import useChatScroll from "../../hooks/useChatScroll";
import useGetMessageLive from "../../hooks/useGetMessageLive";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useGetMessageLive()

  const ref=useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>
  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
