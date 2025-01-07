/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAxios } from "@/hooks/use-axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [token, setToken] = useState<string>();
  const axios = useAxios();

  const login = async (email: string, password: string) => {
    await axios.post("/user/login", {
      email,
      password,
    });

    window.location.href = "/chat";
    // router.push("/chat");
  };

  useEffect(() => {
    // Parse the cookie manually
    const cookies = document.cookie.split("; ").reduce((acc: any, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});

    console.log("@@@@@  -> cookies:", cookies);
    setToken(cookies["auth_token"] || undefined);
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
