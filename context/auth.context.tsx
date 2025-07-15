"use client";
import { useAxios } from "@/hooks/use-axios";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const router = useRouter();
  const axios = useAxios();

  const login = async (email: string, password: string) => {
    await axios.post("/user/login", {
      email,
      password,
    });

    router.push("/chat");
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
