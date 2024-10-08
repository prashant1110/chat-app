import  { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/${selectedConversation?.id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessage();
  }, [selectedConversation,setMessages]);

  return { messages, loading };
};

export default useGetMessages;
