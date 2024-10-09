import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "./../assets/sounds/notification.mp3";

const useGetMessageLive = () => {
  const { socket } = useSocketContext();
  const { setMessages, messages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      message.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, message]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useGetMessageLive;
