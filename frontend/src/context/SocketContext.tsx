import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

type SocketContext = {
  socket: Socket | null;
  onlineUsers: string[];
};

const SocketContext = createContext<SocketContext | undefined>(undefined);

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }

  return context;
};

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { isLoading, authUser } = useAuth();

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: { userId: authUser.id },
      });
      socketRef.current = socket;

      // Listen for the "getOnlineUsers" event to update the online users list
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Cleanup function: close the socket when component unmounts or authUser changes
      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading) {
      // Close the socket if the user logs out or there's no authUser
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
