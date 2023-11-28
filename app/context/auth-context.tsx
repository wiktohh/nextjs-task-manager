import { useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import { _getUser } from "../lib/data";
import { useAxios } from "../hooks/use-axios";

const AuthContext = createContext({
  token: "",
  user: {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [loading, isLoading] = useState(false);

  const logout = () => {
    setToken("");
    setUser({});
  };

  const axios = useAxios();

  useQuery({
    queryKey: "userData",
    queryFn: () => _getUser(axios),
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
    },
    onError: () => {
      logout();
    },
  });

  const contextValue = {
    token,
    user,
    logout,
  };

  return (
    loading && (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    )
  );
};
