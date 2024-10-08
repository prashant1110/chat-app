import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setAuthUser(null);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
