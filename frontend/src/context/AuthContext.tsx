import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate } from "react-router-dom";

type AuthType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const AuthContext = createContext<{
  authUser: AuthType | null;
  setAuthUser: Dispatch<SetStateAction<AuthType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/getme");
        const user = await res.json();

        if (!user) {
          throw new Error(user.error);
        }

        if (user.error) {
          <Navigate to={"/login"} />;
          return;
        }

        setAuthUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
