import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const update = async (
    id:string | undefined,
    fullname?: string,
    password?: string,
    newPassword?: string
  ) => {
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id,fullname, password, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      //   setAuthUser(data);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, update };
};

export default useUpdate;
