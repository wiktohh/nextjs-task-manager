"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { _getUser } from "../lib/data";
import { useAxios } from "../hooks/use-axios";
import { useRouter } from "next/navigation";

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
    localStorage.removeItem("token");
    router.replace("/auth/login");
  };

  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await _getUser(axios);
        setToken(localStorage.getItem("token") || "");
        setUser(userData);
        setLoaded(true);
        console.log(user);
      } catch (error) {
        logout();
        setLoaded(true);
      }
    };
    fetchData();
  }, [token]);

  const contextValue: AuthContextProps = {
    token,
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loaded ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
