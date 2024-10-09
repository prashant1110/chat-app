import { create } from "zustand";

export type ConversationType = {
  id: string;
  fullname: string;
  profilePic: string;
};

export type MessageType = {
  id: string;
  body: string;
  sednerId: string;
  createdAt:string
  shouldShake?:boolean
};

type ConversationState = {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (convsersation: ConversationType | null) => void;
  setMessages: (message: MessageType[]) => void;
};

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
