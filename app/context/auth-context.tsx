"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { _getUser } from "../lib/data";
import { useAxios } from "../hooks/use-axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: number;
}

interface AuthContextProps {
  token: string;
  user: UserData;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  user: {} as UserData,
  logout: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UserData>({} as UserData);
  const [loaded, setLoaded] = useState<boolean>(false);

  const router = useRouter();

  const logout = () => {
    setToken("");
    setUser({} as UserData);
    Cookies.remove("token");
    router.replace("/auth/login");
  };

  const axios = useAxios();

  useQuery({
    queryKey: ["userData"],
    queryFn: () => _getUser(axios),
    onSuccess: (data) => {
      console.log(data);
      setUser(data);
      setToken(Cookies.get("token") || "");
      setLoaded(true);
    },
    onError: () => {
      Cookies.remove("token");
      router.replace("/auth/login");
    },
  });

  const contextValue: AuthContextProps = {
    token,
    user,
    logout,
  };

  return (
    loaded && (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export default AuthProvider;
