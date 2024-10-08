import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

type SignInput = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword:string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const signup = async (inputs: SignInput) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAuthUser(data);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
